import TypeTester from './TypeTester.js';

describe('Truthy<T> should', () => {
    const tester = new TypeTester();

    tester.import('Truthy').from('./src/types');

    it('properly infer the type of Truthy<boolean>', () => tester.expectType('Truthy<boolean>').toResolveTo('true'));
    it('be unable to narrow Truthy<number>', () => tester.expectType('Truthy<number>').toResolveTo('number'));
    it('be unable to narrow Truthy<bigint>', () => tester.expectType('Truthy<bigint>').toResolveTo('bigint'));
    it('be unable to narrow Truthy<string>', () => tester.expectType('Truthy<string>').toResolveTo('string'));
    it('return never for Truthy<null | undefined>', () => tester.expectType('Truthy<null | undefined>').toResolveTo('never'));
    it('return never for Truthy<null>', () => tester.expectType('Truthy<null>').toResolveTo('never'));
    it('return never for Truthy<undefined>', () => tester.expectType('Truthy<undefined>').toResolveTo('never'));
    it('properly infer the type of nullable types', () => tester.expectType('Truthy<Date | null>').toResolveTo('Date'));
    it('do nothing for types that are always truthy (instances)', () => tester.expectType('Truthy<Date>').toResolveTo('Date'));
    it('do nothing for types that are always truthy (objects)', () => tester.expectType('Truthy<{}>').toResolveTo('{}'));
    it('be unable to narrow Truthy<unknown>', () => tester.expectType('Truthy<unknown>').toResolveTo('unknown'));
    it('return any if type is any', () => tester.expectType('Truthy<any>').toResolveTo('any'));
    it('properly segregate generic union types', () => tester.expectType('Truthy<number | string>').toResolveTo('number | string'));
    it('properly segregate literal union types', () => tester.expectType('Truthy<0 | 5 | 2 | "five" | "">').toResolveTo('5 | 2 | "five"'));
    it('return never for non-matching literal types', () => tester.expectType('Truthy<0>').toResolveTo('never'));
    it('return never for non-matching literal unions', () => tester.expectType('Truthy<0 | "">').toResolveTo('never'));
    it('return never for -0', () => tester.expectType('Truthy<-0>').toResolveTo('never'));
});

describe('Falsy<T> should', () => {
    const tester = new TypeTester();

    tester.import('Falsy').from('./src/types');

    it('properly infer the type of Falsy<boolean>', () => tester.expectType('Falsy<boolean>').toResolveTo('false'));
    it('properly infer the type of Falsy<number>', () => tester.expectType('Falsy<number>').toResolveTo('0'));
    it('properly infer the type of Falsy<bigint>', () => tester.expectType('Falsy<bigint>').toResolveTo('0n'));
    it('properly infer the type of Falsy<string>', () => tester.expectType('Falsy<string>').toResolveTo('""'));
    it('properly infer the type of Falsy<null | undefined>', () => tester.expectType('Falsy<null | undefined>').toResolveTo('null | undefined'));
    it('properly infer the type of Falsy<null>', () => tester.expectType('Falsy<null>').toResolveTo('null'));
    it('properly infer the type of Falsy<undefined>', () => tester.expectType('Falsy<undefined>').toResolveTo('undefined'));
    it('properly infer the type of nullable types', () => tester.expectType('Falsy<Date | null>').toResolveTo('null'));
    it('return never for types that can never be falsy (instances)', () => tester.expectType('Falsy<Date>').toResolveTo('never'));
    it('return never for types that can never be falsy (objects)', () => tester.expectType('Falsy<{}>').toResolveTo('never'));
    it('return all falsy types if type is unknown', () => tester.expectType('Falsy<unknown>').toResolveTo('false | 0 | 0n | "" | null | undefined'));
    it('return all falsy types if no generic is specified', () => tester.expectType('Falsy').toResolveTo('false | 0 | 0n | "" | null | undefined'));
    it('return any if type is any', () => tester.expectType('Falsy<any>').toResolveTo('any'));
    it('properly segregate generic union types', () => tester.expectType('Falsy<number | string>').toResolveTo('0 | ""'));
    it('properly segregate literal union types', () => tester.expectType('Falsy<0 | 5 | 2 | "five" | "">').toResolveTo('0 | ""'));
    it('return never for non-matching literal types', () => tester.expectType('Falsy<5>').toResolveTo('never'));
    it('return never for non-matching literal unions', () => tester.expectType('Falsy<5 | 2 | "five">').toResolveTo('never'));
    it('keep -0', () => tester.expectType('Falsy<-0>').toResolveTo('0'));
});

describe('ExcludeProps<T, U> should', () => {
    const tester = new TypeTester();

    tester.import('ExcludeProps').from('./src/types');

    const T = '{ num: number; str: string; nullable: number | undefined; }';

    it('remove string properties', () => tester.expectType(`ExcludeProps<${T}, string>`).toResolveTo(`Pick<${T}, "num" | "nullable">`));
});
