---
layout:      page
title:       Arrays.replaceAll()
module:      Arrays
added:       0.6.0
description: Replaces all elements in the array with one or multiple others
             and returns the original (modified) array.
parameters:
  array: An array containing the elements you wish to replace.
  element: The element you wish to replace. The array must contain this element.
  replacement: The element <code>element</code> should be replaced by.
---
## Syntax

```ts
function replaceAll<T>(array: T[], replacement: Iterable<T>): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar'];

Arrays.replaceAll(array, ['bar', 'baz']);

console.log(array);   // -> ['bar', 'baz']
```

## Remarks

This function modifies the array *in-place*, i.e. it modifies the original array
and returns it. It does *not* return a new array.

Compare
[`Arrays.replace()`]({{ site.baseurl }}{% link _pages/Arrays/replace.md %}).
