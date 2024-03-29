---
layout:      page
title:       Arrays.replace()
module:      Arrays
added:       0.0.1
updated:     0.4.0
description: Replaces the specified element with another
             and returns the original array.
parameters:
  array: An array containing the elements you wish to replace.
  element: The element you wish to replace. The array must contain this element.
  replacement: The element <code>element</code> should be replaced by.
---
## Syntax

```ts
function replace<T>(array: T[], element: T, replacement: T): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar'];

Arrays.replace(array, 'bar', 'baz');

console.log(array);   // -> ['foo', 'baz']
```

## Remarks

This function modifies the array *in-place*, i.e. it modifies the original array
and returns it. It does *not* return a new array.

This function throws an error if the element to be replaced is not found in the
array.

If the array contains multiples of `element`, only the first occurrence is
replaced. To replace all occurrences, use `while (array.includes(element)) { ...
}`.

Compare
[`Arrays.replaceAll()`]({{ site.baseurl }}{% link _pages/Arrays/replaceAll.md %}).
