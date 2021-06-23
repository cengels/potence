---
layout:      page
title:       Arrays.isNotEmpty()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Checks whether an iterable is not empty.
parameters:
  iterable: An iterable with any number of elements.
---
## Syntax

```ts
function isNotEmpty(iterable: Iterable<unknown> | HasLength | HasSize): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.isEmpty([]);         // -> false
Arrays.isEmpty([1, 2, 3]);  // -> true
Arrays.isEmpty(new Set());  // -> false
```

## Remarks

If the iterable has a `length` or `size` property, this function simply checks
whether its value is not `0`. If the iterable has neither, this function checks
whether its iterator returns any elements. This means that the time complexity
of this function is O(1) for both array-likes and other iterables.

Compare
[`Arrays.isEmpty()`]({{ site.baseurl }}{% link _pages/Arrays/isEmpty.md %}).
