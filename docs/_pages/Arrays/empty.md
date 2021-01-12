---
layout:      page
title:       Arrays.empty()
module:      Arrays
added:       0.0.1
description: Checks whether an array is empty.
parameters:
  array: An array with any number of elements.
---
## Syntax

```ts
function empty(array: readonly unknown[]): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

console.log(Arrays.empty([]));          // -> true
console.log(Arrays.empty([1, 2, 3]));   // -> false
```

## Remarks

This function is analogous to
[`Arrays.notEmpty()`]({{ site.baseurl }}{% link _pages/Arrays/notEmpty.md %}).