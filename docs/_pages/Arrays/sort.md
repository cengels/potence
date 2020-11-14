---
layout:      page
title:       Arrays.sort()
module:      Arrays
added:       0.0.1
updated:     0.2.0
description: Sorts an array in a standard way depending on its contained
             data type, or use custom sort functions.
overloads:
  - name: Standard Sort
    signature: |
      function sort(array: number[], order?: SortOrder): number[]
      function sort(array: string[], order?: SortOrder): string[]
      function sort(array: Date[], order?: SortOrder): Date[]
    description: 'Sorts an array in a predefined way according to the contained
                 data type:

                 <table>
                    <tr>
                        <th>Data type</th>
                        <th>Sort order</th>
                    </tr>
                    <tr>
                        <td><code>number[]</code></td>
                        <td>numerical</td>
                    </tr>
                    <tr>
                        <td><code>string[]</code></td>
                        <td>alphabetical</td>
                    </tr>
                    <tr>
                        <td><code>Date[]</code></td>
                        <td>chronological</td>
                    </tr>
                 </table>'
    parameters:
      array: The array to sort. Must be one of the three above array types.
      order:
        description: The order in which to sort.
                     Possible values are `'ascending'` (smallest first)
                     and `'descending'` (largest first). If not specified,
                     defaults to `'ascending'`.
        optional: yes
  - name: Custom Sort
    signature: 'function sort<T>(array: T[], ...sortFns: SortFunction<T>[]): T[]'
    description: Sorts an array according to a variable number of custom sort
                 functions. If the first sort function does not return a
                 conclusive result, the next sort function is used and so on.
    parameters:
      array: The array to sort. Can contain any type.
      sortFns:
        description: Any number of sort functions conforming to the same schema
                     as [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description).
                     If a sort function returns `0`, the next sort function is
                     used, until one is found that does not return `0` or all
                     sort functions have been tested (in which case the order
                     of the two tested elements remains unchanged).
        rest: yes
---
## Syntax

{% include overloads.md %}

## Example 1

```ts
import { Arrays } from 'potence';

const numbers = [5, 2, 7];
const strings = ['orange', 'apple', 'banana'];
const dates = [new Date(2020, 2, 13), new Date(2012, 6, 6), new Date(2018, 11, 20)];

Arrays.sort(numbers, 'ascending');   // -> [2, 5, 7]
Arrays.sort(numbers, 'descending');  // -> [7, 5, 2]
Arrays.sort(strings);                // -> ['apple', 'banana', 'orange']
Arrays.sort(dates);                  // -> ['2012-07-06', '2018-12-20', '2020-03-13']
```

## Example 2

```ts
import { Arrays } from 'potence';

const array = [
    { prop1: 5, prop2: 7 },
    { prop1: 5, prop2: 3 },
    { prop1: 2, prop2: 1 }
];

Arrays.sort(array, (a, b) => a.prop1 - b.prop1, (a, b) => a.prop2 - b.prop2);
// Result:
// [
//   { prop1: 2, prop2: 1 },
//   { prop1: 5, prop2: 3 },
//   { prop1: 5, prop2: 7 }
// ]
```

## Remarks

This function sorts the array *in-place*, that is it modifies and returns the
original array.
