---
layout:      page
title:       Arrays.insert()
module:      Arrays
added:       0.6.0
description: Inserts one or multiple elements at the given index.
parameters:
  array: An array containing the elements you wish to replace.
  element: The element you wish to replace. The array must contain this element.
  replacement: The element <code>element</code> should be replaced by.
---
## Syntax

```ts
function insert<T>(array: T[], index: number, ...elements: T[]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar'];

Arrays.insert(array, 1, 'foz', 'baz');

console.log(array);   // -> ['foo', 'foz', 'baz', 'bar']
```

## Remarks

This function modifies the array *in-place*, i.e. it modifies the original array
and returns it. It does *not* return a new array.

This function throws an error if the index is out of bounds.
