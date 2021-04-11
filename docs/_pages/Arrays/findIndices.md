---
layout:      page
title:       Arrays.findIndices()
module:      Arrays
added:       0.5.0
description: Returns an array of indices corresponding to all elements in the
             array that match a condition.
overloads:
  - signature: "function findIndices<T>(array: T[], predicate: (object: T) => boolean): number[]"
    description: Returns the indices for all elements that match the predicate.
                 This function is parallel to
                 [`Array.prototype.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex),
                 but whereas `findIndex()` only returns the first matching
                 index, this function returns all of them.
    parameters:
      array: The array to filter.
      predicate: A predicate that returns `true` if the element's index should
                 be included in the array.
  - signature: "function findIndices<T>(array: T[], object: T): number[]"
    description: Returns the indices for all elements equal to `object`.
                 This function is parallel to
                 [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf),
                 but whereas `indexOf()` only returns the first matching
                 index, this function returns all of them.
    parameters:
      array: The array to filter.
      object: An object of the array's type that may or may not be included
              in the array itself.
---
## Syntax

{% include overloads.md %}

## Example

```ts
import { Arrays } from 'potence';

const array = [0, 1, 2, 2, 4, 8, 10, 12];

Arrays.findIndices(array, 2);  // -> [2, 3]
Arrays.findIndices(array, value => value % 4 === 0);
// -> [4, 5, 7]
```
