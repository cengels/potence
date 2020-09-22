---
layout:      page
title:       Arrays.equal()
module:      Arrays
description: Checks whether the contents of two arrays are referentially equal.
parameters:
  array1: An array with any number of elements.
  array2: An array with any number of elements.
---
## Syntax

```ts
function equal(array1: readonly unknown[], array2: readonly unknown[]): boolean
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

console.log(Arrays.equal([2, 5, 3], [2, 5, 3]));             // -> true
console.log(Arrays.equal([new Object()], [new Object()]));   // -> false
```

## Remarks

If the array is composed of reference types (i.e. objects, arrays, or functions), this function only
compares their references, not the contents. If the array is composed of data types (i.e. booleans,
numbers, strings, `BigInt`s, symbols, as well as `null` or `undefined`), this function checks their structural equality.
For more information on data and structural types, click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

If the arrays do not have the same length, the function automatically returns `false` without comparing the contents.
