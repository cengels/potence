---
layout:      page
title:       Arrays.previous()
module:      Arrays
added:       0.0.1
description: Gets the previous element in the array,
             starting at the given index.
parameters:
  array: An array with any number of elements.
  fromIndex:
    An in-bounds index. The function will return the element belonging
    to <code>fromIndex - 1</code>, or <code>array.length - 1</code> if
    <code>fromIndex</code> is <code>0</code>.
---
## Syntax

```ts
function previous<T>(array: readonly T[], fromIndex: number): T | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = [3, 1, 5];

console.log(Arrays.previous(array, 0));   // -> 5
console.log(Arrays.previous(array, 2));   // -> 1
```

## Remarks

This function will "wrap", that is it will return the last element if the passed index
belongs to the first element in the array.

The index must be within the bounds of the array. If it isn't, the function returns `undefined`.
In TypeScript, you can use the non-null assertion operator (`!`) on the return value if you are absolutely
certain the index is in-bounds.

This function is analogous to [`Arrays.next()`]({{ site.baseurl }}{% link _pages/Arrays/next.md %}).
