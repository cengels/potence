import { Project, SourceFile, Statement, Type } from 'ts-morph';

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
     * Creates a new type alias from the given symbol string
     * and allows you to check whether it resolves to the correct type.
     */
    public expectType(symbol: string): EqualityChecker {
        return equalityChecker(() => this.testFile.addTypeAlias({
            name: '__TEST_TYPE',
            type: symbol
        }), node => node.getNameNode().getType())
    }
}
