---
layout:      page
title:       Arrays.next()
module:      Arrays
description: Gets the next element in the array, starting at the given index.
parameters:
  array: An array with any number of elements.
  fromIndex:
    An in-bounds index. The function will return the element belonging to
    <code>fromIndex + 1</code>, or <code>0</code> if <code>fromIndex</code> is
    the last index in the array.
---
## Syntax

```ts
function next<T>(array: readonly T[], fromIndex: number): T | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = [3, 1, 5];

console.log(Arrays.next(array, 0));   // -> 1
console.log(Arrays.next(array, 2));   // -> 3
```

## Remarks

This function will "wrap", that is it will return the first element if the
passed index belongs to the last element in the array.

The index must be within the bounds of the array. If it isn't, the function
returns `undefined`. In TypeScript, you can use the non-null assertion operator
(`!`) on the return value if you are absolutely certain the index is in-bounds.

This function is analogous to
[`Arrays.previous()`]({% link _pages/Arrays/previous.md %}).
