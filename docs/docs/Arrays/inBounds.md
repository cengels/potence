---
layout:      page
title:       Arrays.inBounds()
module:      Arrays
description: Returns true if the given index is within the array's bounds.
parameters:
  array: An array with any number of elements.
  index: The index to check. Can be any number.
---
## Syntax

```ts
function inBounds(array: readonly unknown[], index: number): boolean
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = [3, 1, 5];

console.log(Arrays.inBounds(array, -1));   // -> false
console.log(Arrays.inBounds(array, 2));    // -> true
console.log(Arrays.inBounds(array, 3));    // -> false
```

## Remarks

This function only checks if a given index is greater than `0` and lower than
`array.length`. It does *not* check whether the item behind the index is
actually defined.
