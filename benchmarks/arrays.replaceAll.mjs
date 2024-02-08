import benny from 'benny';
import { Arrays } from '../build/index.js';

function replaceAll(array, replacement) {
    array.splice(0, array.length, ...replacement);
    return array;
}

export default benny.suite('replaceAll',
    benny.add('by using splice', () => replaceAll([0, 1, 2, 3, 4, 5], [6, 7, 8])),
    benny.add('by setting length to 0', () => Arrays.replaceAll([0, 1, 2, 3, 4, 5], [6, 7, 8])),
    benny.cycle(),
    benny.complete()
)
