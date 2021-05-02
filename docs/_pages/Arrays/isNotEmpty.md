---
layout:      page
title:       Arrays.isNotEmpty()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Checks whether an array is not empty.
parameters:
  array: An array with any number of elements.
---
## Syntax

```ts
function isNotEmpty(array: readonly unknown[]): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

console.log(Arrays.isNotEmpty([]));          // -> false
console.log(Arrays.isNotEmpty([1, 2, 3]));   // -> true
```

## Remarks

This function is analogous to
[`Arrays.isEmpty()`]({{ site.baseurl }}{% link _pages/Arrays/isEmpty.md %}).
