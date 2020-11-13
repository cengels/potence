---
layout:      page
title:       Numbers.isFloat()
module:      Numbers
description: Checks if a number is a floating point number.
parameters:
  value: A number which may or may not be a floating point number.
---
## Syntax

```ts
function isFloat(value: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.isFloat(1);     // -> false
Numbers.isFloat(1.05);  // -> true
```

## Remarks

This function always returns false for
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
and [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

To check whether a number is an integer, use
[`Number.isInteger()`]([`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
