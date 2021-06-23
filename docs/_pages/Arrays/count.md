---
layout:      page
title:       Arrays.count()
module:      Arrays
added:       0.5.0
description: Returns the number of elements in the iterable.
parameters:
  iterable: Any iterable. This can be an array, a set, a map, or any other
            object that can be iterated over or that has a `length` or `size`
            property.
---
## Syntax

```ts
function count(iterable: Iterable<unknown> | HasLength | HasSize): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.count([1, 2, 3]);        // -> 3
Arrays.count(new Set([1, 2]));  // -> 2

function* makeIterable() {
    yield 1;
    yield 2;
}

const iterable = makeIterable();

Arrays.count(iterable);  // -> 2
```

## Remarks

This function's only purpose is to provide a generic way to obtain the number
of elements in an iterable or array-like. Use it in the unlikely case that
you're working with collections whose exact type you don't know.
