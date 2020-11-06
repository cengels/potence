---
layout:      page
title:       Arrays.clear()
module:      Arrays
description: Clears all elements from the given array.
parameters:
  array: The array you want to clear.
---
## Syntax

```ts
function clear<T>(array: T[]): T[]
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = [5, 3, 2];

Arrays.clear(array);

console.log(array);   // -> []
```

## Remarks

This function returns the original array, not a new one.
