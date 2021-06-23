---
layout:      page
title:       Arrays.hasMultiple()
module:      Arrays
added:       0.5.0
description: Returns `true` if the array contains multiple of
             the specified value.
parameters:
  array: An array with any number of elements.
  value: The value to check for multiples on array.
---
## Syntax

```ts
function hasMultiple<T>(array: readonly T[], value: T): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = [0, 1, 2, 2, 3];

Arrays.hasMultiple(array, 2);  // -> true
Arrays.hasMultiple(array, 0);  // -> false
```

## Remarks

This function only compares values for value types,
otherwise it compares references.
