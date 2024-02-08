import { describe, expect, it } from 'vitest';
import { List } from '../src';

describe('static functions', () => {
    it('List.from()', () => expect(List.from([]) instanceof List).toBe(true));
    it('List.of()', () => expect(List.of(5, 2) instanceof List).toBe(true));
});
