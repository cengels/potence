---
layout:      page
title:       Objects.swap()
module:      Objects
description: Swaps the values of two properties on an object and returns the original object.
parameters:
  source: The object which holds the two properties whose values to swap.
  from: The name of the first property whose value to swap.
  to: The name of the second property whose value to swap.
---
## Syntax

```ts
function swap<T extends object>(source: T, from: keyof T, to: keyof T): T
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const obj = { a: 5, b: 3 };

Objects.swap(obj, 'a', 'b');

console.log(obj);  // -> { a: 3, b: 5 }
```

## Remarks

This function does not check if the passed properties actually exist on the
source object, so you should make sure they do.

This function will invoke getters and setters if they exist for the specified
properties.

Note that, because arrays are just objects with integer keys, this function
can also be used to swap two array elements. In that case, `from` and `to`
should be the indices of the elements you wish to swap.
