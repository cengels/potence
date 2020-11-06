---
layout:      page
title:       Arrays.notEmpty()
module:      Arrays
description: Checks whether an array is not empty.
parameters:
  array: An array with any number of elements.
---
## Syntax

```ts
function notEmpty(array: readonly unknown[]): boolean
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

console.log(Arrays.notEmpty([]));          // -> false
console.log(Arrays.notEmpty([1, 2, 3]));   // -> true
```

## Remarks

This function is analogous to
[`Arrays.empty()`]({% link docs/Arrays/empty.md %}).
