---
layout:      page
title:       Arrays.difference()
module:      Arrays
added:       0.5.0
description: Creates a new array with only the elements
             that are unique to one of the given arrays.
parameters:
  array: An array with any number of elements.
  value: The value to check for multiples on array.
---
## Syntax

```ts
function difference<T>(...arrays: readonly T[][]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array1 = [0, 1, 2, 3];
const array2 = [2, 3, 4, 5];

Arrays.difference(array1, array2);  // -> [0, 1, 4, 5]
```

## Remarks

The resulting array will contain all elements except those shared by multiple of the given arrays.
