---
layout:      page
title:       Arrays.removeAt()
module:      Arrays
description: Removes the element at the specified index
             and returns the original array.
parameters:
  array: An array containing the elements you wish to remove.
  index: The index whose element you wish to remove from the array.
         Must be in-bounds.
---
## Syntax

```ts
function removeAt<T>(array: T[], index: number): T[]
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar', 'baz'];

Arrays.removeAt(array, 1);

console.log(array);   // -> ['foo', 'baz']
```

## Remarks

This function modifies the array *in-place*, i.e. it modifies the original array
and returns it. It does *not* return a new array.

This function throws an error if the specified index is out of bounds.
