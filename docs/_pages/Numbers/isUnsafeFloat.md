---
layout:      page
title:       Numbers.isUnsafeFloat()
module:      Numbers
description: Checks if a number is an "unsafe" floating point number, that is
             whether it is likely to suffer from floating point inaccuracies.
parameters:
  value: A number which may or may not be a floating point number.
---
## Syntax

```ts
function isUnsafeFloat(value: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.isUnsafeFloat(0.1);  // -> true
Numbers.isUnsafeFloat(0.5);  // -> false
```

## Remarks

This function tests for floating point inaccuracy by conducting an arbitrary
mathematical operation on the value, inverting it, and comparing it with the
original value. As a result, this function **only returns a "guess"**. You
should not base any important conditions off the result of this function.

This function always returns false for
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
and [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

To compare floating point numbers, use
[`Numbers.compare()`]({% link _pages/Numbers/compare.md %})
instead. Its page also offers a more detailed explanation of floating
point inaccuracies.

Contrast [`Numbers.isSafeFloat()`]({% link _pages/Numbers/isSafeFloat.md %}).
