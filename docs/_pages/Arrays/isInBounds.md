---
layout:      page
title:       Arrays.isInBounds()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Returns true if the given index is within the array's bounds.
parameters:
  array: An array with any number of elements.
  index: The index to check. Can be any number.
---
## Syntax

```ts
function isInBounds(array: readonly unknown[], index: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = new Array(5);
array[0] = 1;
array[1] = 5;

// -> [1, 5, empty, empty, empty]

Arrays.isInBounds(array, -1);   // -> false
Arrays.isInBounds(array, 0);    // -> true
Arrays.isInBounds(array, 3);    // -> true
Arrays.isInBounds(array, 5);    // -> false
```

## Remarks

Note that this function does **not** check whether there is actually an
array element at the specified index, as in when an array is initialized
with empty slots (e.g. using `Array`'s length constructor).
Unless you have a good reason to use this function, you probably want to use
[`Arrays.hasElementAt()`]({{ site.baseurl }}{% link _pages/Arrays/hasElementAt.md %})
instead.
