---
layout:      page
title:       Arrays.isEmpty()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Checks whether an iterable is empty.
parameters:
  iterable: An iterable with any number of elements.
---
## Syntax

```ts
function isEmpty(iterable: Iterable<unknown> | HasLength | HasSize): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.isEmpty([]);         // -> true
Arrays.isEmpty([1, 2, 3]);  // -> false
Arrays.isEmpty(new Set());  // -> true
```

## Remarks

If the iterable has a `length` or `size` property, this function simply checks
whether its value is `0`. If the iterable has neither, this function checks
whether its iterator returns any elements. This means that the time complexity
of this function is O(1) for both array-likes and other iterables.

Compare
[`Arrays.isNotEmpty()`]({{ site.baseurl }}{% link _pages/Arrays/isNotEmpty.md %}).
