---
layout:      page
title:       Numbers.closest()
module:      Numbers
added:       0.5.0
description: Finds the number closest to another.
parameters:
  source: An arbitrary number.
  targets:
    description: A set of numbers from which to find the closest to `source`.
    rest: yes
---
## Syntax

```ts
function closest(source: number, ...targets: number[]): number;
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.closest(5, 8, 1);  // -> 8
```

## Remarks

If multiple numbers are equally close to `source`, this function returns the
one that comes first in the argument list.

If no `targets` are specified, returns `source`.
