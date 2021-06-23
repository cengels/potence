---
layout:      page
title:       Numbers.exponent()
module:      Numbers
added:       0.5.0
description: Finds the exponent used to raise a base to a certain power.
parameters:
  base: The base of the expression. See below for examples.
  power: The power (i.e. the result) of the expression. See below for examples.
---
## Syntax

```ts
function exponent(base: number, power: number): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

// In an expression of the shape:
//    bⁿ = p
// this function's syntax is as follows:
//    exponent(b, p) = n

Numbers.exponent(2, 4);    // -> 2 since 2² = 4
Numbers.exponent(-2, 16);  // -> 4 since (-2)⁴ = 16
Numbers.exponent(-2, 8);   // -> NaN since (-2)³ = -8
```

## Remarks

As seen above, this function will return `NaN` if no viable exponent exists
to raise the given base to the specified power.
