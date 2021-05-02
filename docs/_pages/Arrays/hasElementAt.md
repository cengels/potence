---
layout:      page
title:       Arrays.hasElementAt()
module:      Arrays
added:       0.5.0
description: Returns true if the given index refers to an actual element
             on the specified array.
parameters:
  array: An array with any number of elements.
  index: The index to check. Can be any number.
---
## Syntax

```ts
function hasElementAt(array: readonly unknown[], index: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = new Array(5);
array[0] = 1;
array[2] = undefined;

// -> [1, empty, undefined, empty, empty]

Arrays.hasElementAt(array, -1);   // -> false
Arrays.hasElementAt(array, 0);    // -> true
Arrays.hasElementAt(array, 1);    // -> false
Arrays.hasElementAt(array, 2);    // -> true
```

## Remarks

Contrary to
[`Arrays.isInBounds()`]({{ site.baseurl }}{% link _pages/Arrays/isInBounds.md %}),
this function checks whether there is actually an array element at the specified
index, instead of just checking whether the index is in-bounds.

Note that this function still returns `true` if the element at that index
happens to be the value `undefined`.
