---
layout:      page
title:       Arrays.correlate()
module:      Arrays
added:       0.5.0
description: Iterates through several arrays of the same length at once,
             calling a callback function with all the array elements at
             that index at each step.
parameters:
  sourceN: Any number of arrays whose corresponding elements should be added
           as arguments to the callback function. All arrays must have the
           same length or this function will throw an error.
  callback: A callback function which receives all the array elements at the
           current iteration index as arguments. For instance, if you pass
           three arrays of length two, the callback function will be called
           twice. Once with the arguments `(source1[0], source2[0], source3[0])`
           and once with the arguments `(source1[1], source2[1], source3[1])`.
---
## Syntax

```ts
function correlate<A, B, ...>(source1: readonly A[], source2: readonly B[], ..., callback: (a: A, b: B, ...) => void): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];
const results = [];

Arrays.correlate(array1, array2, array3, (a, b, c) => results.push(a + b + c));
// -> turns into [1 + 4 + 7,   2 + 5 + 8,   3 + 6 + 9]
// -> results: [12, 15, 18]
```

## Remarks

This function does not build any temporary objects and is therefore faster than
using [`Arrays.zip()`]({{ site.baseurl }}{% link _pages/Arrays/zip.md %})
for the same purpose.

**Note for TypeScript users**: This function cannot use a
[rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
due to the fact that the arrays come first, then the callback function. This is
a deliberate choice to make usage of the function more intuitive but has the
unfortunate drawback that there is no generic way to type this function
with an unlimited number of arguments. As a result, TypeScript expects a maximum
of 10 arrays. If you'd like to use more or if you'd like to spread a
two-dimensional array into the function, you may have to disable type-checking
for that line using `// @ts-ignore` in the preceding line.
