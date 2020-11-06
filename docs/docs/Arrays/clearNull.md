---
layout:      page
title:       Arrays.clearNull()
module:      Arrays
description: Removes all `null` or `undefined` elements from the array.
parameters:
  array: The array you want to clear of `null` values.
---
## Syntax

```ts
function clearNull<T>(array: T[]): T[]
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = [5, undefined, 2, null];

Arrays.clearNull(array);

console.log(array);   // -> [5, 2]
```

## Remarks

This function returns the original array, not a new one.