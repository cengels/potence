---
layout:      page
title:       Numbers.isOdd()
module:      Numbers
added:       0.0.1
updated:     0.5.0
description: Checks if a number is an odd number.
parameters:
  value: A number which may or may not be odd.
---
## Syntax

```ts
function isOdd(value: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.isOdd(16);  // -> false
Numbers.isOdd(5);   // -> true
```

## Remarks

Floating point numbers are never odd. The same goes for
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN),
[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY),
and [`-Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY).

Compare [`Numbers.isEven()`]({{ site.baseurl }}{% link _pages/Numbers/isEven.md %}).
