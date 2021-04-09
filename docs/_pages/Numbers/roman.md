---
layout:      page
title:       Numbers.roman()
module:      Numbers
added:       0.5.0
description: Converts a positive non-zero integer to a roman numeral.
parameters:
  value: The value to convert to a roman numeral.
         Note that only positive integer values can be converted.
         If the value is zero or negative, this function will throw an error.
         If the value is a floating point number, it is truncated before being
         converted.
---
## Syntax

```ts
function roman(value: number): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.roman(3);     // -> 'III'
Numbers.roman(2021);  // -> 'MMXXI'
```

## Remarks

Canonically the largest number that can be represented in roman notation is
`3,999` (`MMMCMXCIX`). This function, in contrast, allows arbitrarily large
values to be converted and will simply chain the largest roman numeral
as many times as needed. It should be noted that this technically violates
the rules of roman notation. If this matters to you, you should ensure
you do not pass values larger than `3,999` to this function.
