---
layout:      page
title:       Arrays.remove()
module:      Arrays
description: Removes the specified element(s) from the array
             and returns the original array.
parameters:
  array: An array containing the elements you wish to remove.
  elements:
    description: The elements you wish to remove from the array.
                 If no elements are specified, the function does nothing.
    rest: yes
---
## Syntax

```ts
function remove<T>(array: T[], ...elements: T[]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['foo', 'bar', 'baz'];

Arrays.remove(array, 'bar', 'baz');

console.log(array);   // -> ['foo']
```

## Remarks

This function modifies the array *in-place*, i.e. it modifies the original array
and returns it. It does *not* return a new array.

If the array contains multiples of the specified element(s), all of them are
removed, not just the first.

If the array does not contain the elements that are to be removed, this function
throws an error. To avoid this, either check whether the array contains the
element(s) first by calling `array.includes(element)` or wrap the function call
in a `try` block.
