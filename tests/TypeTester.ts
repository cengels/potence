import { Diagnostic, Project, SourceFile, Statement, Type } from 'ts-morph';

interface ImportBuilder {
    from(path: string): TypeTester;
}

interface EqualityChecker {
    /**
     * Checks if the type resolves to this type.
     * If the string contains a union type, the order doesn't have to match.
     */
    toResolveTo(expected: string): void;
}

interface ErrorChecker {
    /**
     * Checks if the supplied code throws a type error.
     */
    toThrowError(): void;
    /**
     * Checks if the supplied code runs without throwing type errors.
     */
    toNotThrowError(): void;
}

function equalityChecker<T extends Statement>(create: () => T, tester: (node: T) => Type): EqualityChecker {
    return {
        toResolveTo(expected: string) {
            const node = create();
            const type = tester(node);

            if (type.isUnion() && expected.includes('|')) {
                const union = expected.split('|').map(t => t.trim());
                const sourceUnion = type.getUnionTypes().map(t => t.getText());
                expect(sourceUnion.sort()).toStrictEqual(union.sort())
            } else {
                expect(type.getText()).toBe(expected);
            }

            node.remove();
        }
    }
}

function throwOnError(diagnostics: Diagnostic[]): void {
    if (diagnostics.length > 0) {
        throw new Error(diagnostics.map(x => `TS${x.getCode()}: ${x.getMessageText()} (line ${x.getLineNumber()})`).join('\n'));
    }
}

function errorChecker<T extends Statement>(create: () => T[]): ErrorChecker {
    return {
        toThrowError() {
            const nodes = create();
            const diagnostics = nodes[0].getSourceFile().getPreEmitDiagnostics();
            expect(() => throwOnError(diagnostics)).toThrowError();
            nodes.forEach(statement => statement.remove());
        },
        toNotThrowError() {
            const nodes = create();
            const diagnostics = nodes[0].getSourceFile().getPreEmitDiagnostics();
            expect(() => throwOnError(diagnostics)).not.toThrowError();
            nodes.forEach(statement => statement.remove());
        }
    }
}

export default class TypeTester {
    private readonly project: Project;
    private readonly testFile: SourceFile;

    public constructor() {
        this.project = new Project({ tsConfigFilePath: 'tsconfig.json' });
        this.testFile = this.project.createSourceFile('__TEST_FILE.ts');
    }

    /**
     * Imports the given named import from a module
     * for the purposes of testing.
     */
    public import(symbol: string): ImportBuilder {
        return {
            from: (path: string): TypeTester => {
                this.testFile.addImportDeclaration({ namedImports: [symbol], moduleSpecifier: path });

                return this;
            }
        };
    }

    /**
     * Writes arbitrary code to the test block.
     * Useful for defining variables or functions that will be checked
     * by expect() or expectType() without having to redefine them
     * on every expect call.
     */
    public write(code: string): this {
        this.testFile.addStatements(code);

        return this;
    }

    /**
     * Creates a new type alias from the given symbol string
     * and allows you to check whether it resolves to the correct type.
     */
    public expectType(symbol: string): EqualityChecker {
        return equalityChecker(() => this.testFile.addTypeAlias({
            name: '__TEST_TYPE',
            type: symbol
        }), node => node.getNameNode().getType())
    }

    /**
     * Allows you to check whether code throws or does not throw an error.
     */
    public expect(code: string): ErrorChecker {
        return errorChecker(() => this.testFile.addStatements(code));
    }
}
