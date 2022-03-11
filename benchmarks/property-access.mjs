import benny from 'benny';
import { Objects } from '../build/index.js';

function hasProperty(source, propertyName, type) {
    return source != null
        // The 'in' operator can't be used with primitive types, but
        // we can get around that by explicitly converting them
        // to objects first.
        && propertyName in new Object(source)
        && (type == null || (typeof type === 'string'
            ? typeof source[propertyName] === type
            : source[propertyName] instanceof type));
}



const testObject = {
    one() { return true; },
    two: 2,
    date: new Date()
};

const testString = 'foo';

export default [
    benny.suite('hasProperty',
        benny.add('with primitive check (object)', () => Objects.hasProperty(testObject, 'one')),
        benny.add('without primitive check (object)', () => hasProperty(testObject, 'one')),
        benny.add('with primitive check (string)', () => Objects.hasProperty(testString, 'length')),
        benny.add('without primitive check (string)', () => hasProperty(testString, 'length')),
        benny.cycle(),
        benny.complete()
    ),
    benny.suite('hasProperty (+ typeof)',
        benny.add('with primitive check (object)', () => Objects.hasProperty(testObject, 'one', 'function')),
        benny.add('without primitive check (object)', () => hasProperty(testObject, 'one', 'function')),
        benny.add('with primitive check (string)', () => Objects.hasProperty(testString, 'length', 'number')),
        benny.add('without primitive check (string)', () => hasProperty(testString, 'length', 'number')),
        benny.cycle(),
        benny.complete()
    ),
    benny.suite('hasProperty (+ instanceof)',
        benny.add('with primitive check (object), no instanceof', () => Objects.hasProperty(testObject, 'date')),
        benny.add('without primitive check (object), no instanceof', () => hasProperty(testObject, 'date')),
        benny.add('with primitive check (object)', () => Objects.hasProperty(testObject, 'date', Date)),
        benny.add('without primitive check (object)', () => hasProperty(testObject, 'date', Date)),
        benny.cycle(),
        benny.complete()
    ),
    benny.suite('typeof check',
        benny.add('dot notation', () => typeof testString.length === 'number'),
        benny.add('bracket syntax', () => typeof testString['length'] === 'number'),
        benny.cycle(),
        benny.complete()
    )
];

// Results:
// - the current implementation is the fastest on all types
// - the current implementation is over 90% slower when using typeof on primitive properties
// - the old implementation is over 90% slower in all cases
// - bracket syntax performance varies greatly, but can be between 40% and 90% slower than dot notation
// - this random variance leads me to believe the benchmark may not be very trustworthy
