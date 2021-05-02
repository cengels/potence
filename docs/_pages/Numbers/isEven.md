---
layout:      page
title:       Numbers.isEven()
module:      Numbers
added:       0.0.1
updated:     0.5.0
description: Checks if a number is an even number.
parameters:
  value: A number which may or may not be even.
---
## Syntax

```ts
function isEven(value: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.isEven(16);  // -> true
Numbers.isEven(5);   // -> false
```

## Remarks

Floating point numbers are never even. The same goes for
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
and [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

Compare [`Numbers.isOdd()`]({{ site.baseurl }}{% link _pages/Numbers/isOdd.md %}).
