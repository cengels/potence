---
layout:      page
title:       Arrays.last()
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Returns the last element in an iterable.
             If the iterable is empty, returns `undefined`.
parameters:
  array: An iterable with 0 or more elements from which the
         <code>(n-1)</code>th element is returned (but not removed).
---
## Syntax

```ts
function last<T>(iterable: Iterable<T>): T | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.last([3, 1, 5]);           // -> 5
Arrays.last(new Set([3, 1, 5]));  // -> 5
```

## Remarks

When passing in an array, the behaviour is functionally equivalent to
calling `array[array.length - 1]` but saves you from having to assign the
array to a temporary variable to be able to call
`array[array.length - 1]` (see the example above).

When passing in any other iterable, this function calls its iterator
and returns the last item yielded. As this function has to iterate
over all elements to get there, its time complexity when using non-arrays
is O(n).

Compare
[`Arrays.first()`]({{ site.baseurl }}{% link _pages/Arrays/first.md %}).
