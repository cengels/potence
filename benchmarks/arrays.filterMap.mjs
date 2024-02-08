import benny from 'benny';
import { Arrays, List } from '../build/index.js';

const array = new List([
    "dDnwvf",
    "HO1CDH",
    "uU9enT",
    "LziRZdFG",
    "Krpjyv",
    "aiXnBV",
    "iAa9Dv",
    "ipACFApE",
    "BubyX5",
    "CB2DwN",
    "yJ4c5pmY",
    "tsGG1Q",
    "PmZP6O",
    "E1vxX9zK",
    "LbCC9T",
    "oGAzsb",
    "wBdAdm9x",
    "S5rVMsBB",
    "CuiKbU",
    "rrCANK"
]);

export default benny.suite('filterMap',
    benny.add('List.filterMap', () => array.filterMap(x => x.length < 7 ? x.slice(1) : undefined)),
    benny.add('Arrays.filterMap', () => Arrays.filterMap(array, x => x.length < 7 ? x.slice(1) : undefined)),
    benny.add('Array.filter.map', () => array.filter(x => x.length < 7).map(x => x.slice(1))),
    benny.add('PotentIterator.filter.map', () => array.iterator().filter(x => x.length < 7).map(x => x.slice(1).collect())),
    benny.cycle(),
    benny.complete()
)
