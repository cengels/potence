---
layout:      page
title:       Numbers.closeTo()
module:      Numbers
description: Alias for §Numbers.compare()§.
parameters:
  value1:    The first number to compare.
  value2:    The second number to compare.
  tolerance: The tolerance to use for this comparison.
             By default, this is `0.0000001`. To use a custom tolerance, either
             supply this argument or configure a new global default tolerance
             using §Numbers.configure()§.
---
## Syntax

```ts
function closeTo(value1: number, value2: number, tolerance?: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.closeTo(0.1 + 0.2, 0.3)  // -> true
```
