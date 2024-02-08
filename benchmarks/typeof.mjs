import benny from 'benny';

const testString = 'foo';

export default benny.suite('typeof check',
    benny.add('dot notation', () => typeof testString.length === 'number'),
    benny.add('bracket syntax', () => typeof testString['length'] === 'number'),
    benny.cycle(),
    benny.complete()
)
