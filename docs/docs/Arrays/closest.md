---
layout:      page
title:       Arrays.closest()
module:      Arrays
description: Returns the closest array element to some other element.
overloads:
  - name: Closest Number
    signature: 'function closest(array: readonly number[], target: number): number'
    description: In an array of numbers, returns the number
                 closest to the given number.
    parameters:
      array: An array that contains only numbers.
      target: Any number. The function will loop through `array`
              and return the number closest to `target`.
  - name: Closest Element
    signature: 'function closest<T>(array: readonly T[], callback: (item: T) => number, target: number): T'
    description: Returns the array element closest to the result of a custom
                 callback function.
    parameters:
      array: An array that may contain any type.
      callback: A callback that will be executed for every array element
                and should return a number. This callback will help
                associate each array element with a number. These numbers
                will then be compared against `target` and the array element
                closest to `target` will be returned.
      target: The target number to compare the results of `callback` against.
---
## Syntax

{% include overloads.md %}

## Example 1: Number Array

```ts
import { Arrays } from 'potence';

const numbers = [2, 4, 8, 16, 32, 64, 128];

Array.closest(numbers, 1);    // -> 2
Array.closest(numbers, 6);    // -> 4
Array.closest(numbers, 50);   // -> 64
Array.closest(numbers, 100);  // -> 128
```

## Example 2: Non-Number Array

```ts
import { Arrays } from 'potence';

const strings = ['orange', 'multi-word string', 'goat', 'electricity'];

// Find the string with a length closest to 10

Arrays.closest(array, string => string.length, 10);
// -> 'electricity'
```

## Remarks

If the array is empty, this function will simply return the target number.

If two array elements are equidistant from one another (meaning that their
associated reference number is identical), this function will return the array
element with the lowest index (as in: the one that shows up first in the array).
