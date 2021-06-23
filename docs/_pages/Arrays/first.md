---
layout:      page
title:       Arrays.first()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Returns the first element in an iterable.
             If the iterable is empty, returns `undefined`.
parameters:
  iterable: An iterable with 0 or more elements from which the "0th" element
            is returned (but not removed).
---
## Syntax

```ts
function first<T>(iterable: Iterable<T>): T | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.first([3, 1, 5]);           // -> 3
Arrays.first(new Set([3, 1, 5]));  // -> 3
```

## Remarks

When passing in an array, the behaviour is functionally equivalent to
calling `array[0]`.

When passing in any other iterable, this function calls its iterator
and returns the first item yielded. It then discards the iterator
without iterating over the remaining items, so the time complexity
of this function is O(1) in all cases.

Compare [`Arrays.last()`]({{ site.baseurl }}{% link _pages/Arrays/last.md %}).
