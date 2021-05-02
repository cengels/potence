---
layout:      page
title:       Arrays.isEmpty()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Checks whether an array is empty.
parameters:
  array: An array with any number of elements.
---
## Syntax

```ts
function isEmpty(array: readonly unknown[]): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

console.log(Arrays.isEmpty([]));          // -> true
console.log(Arrays.isEmpty([1, 2, 3]));   // -> false
```

## Remarks

This function is analogous to
[`Arrays.isNotEmpty()`]({{ site.baseurl }}{% link _pages/Arrays/isNotEmpty.md %}).
