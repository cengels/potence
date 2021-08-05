import { equal } from '../objects/index.js';
import type { Predicate } from '../types.js';

export function truthy(): Predicate<unknown> {
    return item => Boolean(item);
}

export function falsy(): Predicate<unknown> {
    return item => !item;
}

export function oneOf<T>(...these: T[]): Predicate<unknown> {
    return item => these.some(that => equal(item, that));
}
