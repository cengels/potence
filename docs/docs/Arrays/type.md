---
layout:      page
title:       Arrays.type()
module:      Arrays
description: Checks if the array contains only elements of the given type.
parameters:
  array: An array with any number of elements whose type you wish to check.
  type: The element you wish to replace. The array must contain this element.
---
## Syntax

```ts
function type(array: readonly unknown[], type: BaseType | Constructor): boolean
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar'];

Arrays.replace(array, 'bar', 'baz');

console.log(array);   // -> ['foo', 'baz']
```

## Remarks

The test always returns `true` if the array is empty.
