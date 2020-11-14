---
layout:      page
title:       Arrays.clearNull()
module:      Arrays
added:       0.0.1
updated:     0.4.0
description: Removes all `null` or `undefined` elements from the array.
parameters:
  array: The array you want to clear of `null` values.
---
## Syntax

```ts
function clearNull<T>(array: T[]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = [5, undefined, 2, null];

Arrays.clearNull(array);

console.log(array);   // -> [5, 2]
```

## Remarks

This function returns the original array, not a new one.
