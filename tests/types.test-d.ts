/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, it } from 'vitest';
import { ExcludeProps, Falsy, Truthy } from '../src/types.js';

describe('Truthy<T> should', () => {
    it('properly infer the type of Truthy<boolean>', () => expectTypeOf<Truthy<boolean>>().toMatchTypeOf<true>());
    it('be unable to narrow Truthy<number>', () => expectTypeOf<Truthy<number>>().toMatchTypeOf<number>());
    it('be unable to narrow Truthy<bigint>', () => expectTypeOf<Truthy<bigint>>().toMatchTypeOf<bigint>());
    it('be unable to narrow Truthy<string>', () => expectTypeOf<Truthy<string>>().toMatchTypeOf<string>());
    it('return never for Truthy<null | undefined>', () => expectTypeOf<Truthy<null | undefined>>().toMatchTypeOf<never>());
    it('return never for Truthy<null>', () => expectTypeOf<Truthy<null>>().toMatchTypeOf<never>());
    it('return never for Truthy<undefined>', () => expectTypeOf<Truthy<undefined>>().toMatchTypeOf<never>());
    it('properly infer the type of nullable types', () => expectTypeOf<Truthy<Date | null>>().toMatchTypeOf<Date>());
    it('do nothing for types that are always truthy (instances)', () => expectTypeOf<Truthy<Date>>().toMatchTypeOf<Date>());
    it('do nothing for types that are always truthy (objects)', () => expectTypeOf<Truthy<{}>>().toMatchTypeOf<{}>());
    it('be unable to narrow Truthy<unknown>', () => expectTypeOf<Truthy<unknown>>().toMatchTypeOf<unknown>());
    it('return any if type is any', () => expectTypeOf<Truthy<any>>().toMatchTypeOf<any>());
    it('properly segregate generic union types', () => expectTypeOf<Truthy<number | string>>().toMatchTypeOf<number | string>());
    it('properly segregate literal union types', () => expectTypeOf<Truthy<0 | 5 | 2 | "five" | "">>().toMatchTypeOf<5 | 2 | "five">());
    it('return never for non-matching literal types', () => expectTypeOf<Truthy<0>>().toMatchTypeOf<never>());
    it('return never for non-matching literal unions', () => expectTypeOf<Truthy<0 | "">>().toMatchTypeOf<never>());
    it('return never for -0', () => expectTypeOf<Truthy<-0>>().toMatchTypeOf<never>());
});

describe('Falsy<T> should', () => {
    it('properly infer the type of Falsy<boolean>', () => expectTypeOf<Falsy<boolean>>().toMatchTypeOf<false>());
    it('properly infer the type of Falsy<number>', () => expectTypeOf<Falsy<number>>().toMatchTypeOf<0>());
    it('properly infer the type of Falsy<bigint>', () => expectTypeOf<Falsy<bigint>>().toMatchTypeOf<0n>());
    it('properly infer the type of Falsy<string>', () => expectTypeOf<Falsy<string>>().toMatchTypeOf<"">());
    it('properly infer the type of Falsy<null | undefined>', () => expectTypeOf<Falsy<null | undefined>>().toMatchTypeOf<null | undefined>());
    it('properly infer the type of Falsy<null>', () => expectTypeOf<Falsy<null>>().toMatchTypeOf<null>());
    it('properly infer the type of Falsy<undefined>', () => expectTypeOf<Falsy<undefined>>().toMatchTypeOf<undefined>());
    it('properly infer the type of nullable types', () => expectTypeOf<Falsy<Date | null>>().toMatchTypeOf<null>());
    it('return never for types that can never be falsy (instances)', () => expectTypeOf<Falsy<Date>>().toMatchTypeOf<never>());
    it('return never for types that can never be falsy (objects)', () => expectTypeOf<Falsy<{}>>().toMatchTypeOf<never>());
    // @ts-expect-error
    it('return all falsy types if type is unknown', () => expectTypeOf<Falsy<unknown>>().toMatchTypeOf<false | 0 | 0n | "" | null | undefined>());
    // @ts-expect-error
    it('return all falsy types if no generic is specified', () => expectTypeOf<Falsy>().toMatchTypeOf<false | 0 | 0n | "" | null | undefined>());
    it('return any if type is any', () => expectTypeOf<Falsy<any>>().toMatchTypeOf<any>());
    it('properly segregate generic union types', () => expectTypeOf<Falsy<number | string>>().toMatchTypeOf<0 | "">());
    it('properly segregate literal union types', () => expectTypeOf<Falsy<0 | 5 | 2 | "five" | "">>().toMatchTypeOf<0 | "">());
    it('return never for non-matching literal types', () => expectTypeOf<Falsy<5>>().toMatchTypeOf<never>());
    it('return never for non-matching literal unions', () => expectTypeOf<Falsy<5 | 2 | "five">>().toMatchTypeOf<never>());
    it('keep -0', () => expectTypeOf<Falsy<-0>>().toMatchTypeOf<0>());
});

describe('ExcludeProps<T, U> should', () => {
    type T = { num: number; str: string; nullable: number | undefined; };

    it('remove string properties', () => expectTypeOf<ExcludeProps<T, string>>().toMatchTypeOf<Pick<T, "num" | "nullable">>());
});
