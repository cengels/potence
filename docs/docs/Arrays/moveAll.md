---
layout:      page
title:       Arrays.moveAll()
module:      Arrays
description: Wraps all array elements around by a specified number of places.
parameters:
  array: The array whose elements to move.
  by: The number of places to move all elements in the array by.
      This number can be greater than the length of the array.
      It can also be negative, in which case the elements are moved
      backwards instead of forwards.
---
## Syntax

```ts
function moveAll<T>(array: T[], by: number): T[]
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.moveAll([0, 1, 2], 1);  // -> [2, 0, 1]
Arrays.moveAll([0, 1, 2], -1);  // -> [1, 2, 0]
// `by` can be larger than the size of the array
Arrays.moveAll([0, 1, 2], 5);  // -> [1, 2, 0]
```

## Remarks

This function essentially offsets all elements in the array but wraps them back
around to the beginning/end of the array if they exceed the end/beginning,
respectively, so it does not produce any empty array elements.
