---
layout:      page
title:       Numbers.lcm()
module:      Numbers
description: Returns the
             [least common multiple](https://en.wikipedia.org/wiki/Least_common_multiple)
             of two or more integers.
parameters:
  values:
    description: Two or more non-zero integers from which the least common
                 multiple should be calculated. If less than two integers are
                 specified, some numbers are floating point numbers, or some
                 numbers are 0, this function will return `0`.
    rest: yes
---
## Syntax

```ts
function lcm(...values: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.lcm(3, 6);    // -> 6     (3 * 2 and  6 * 1)
Numbers.lcm(16, 18);  // -> 144  (16 * 9 and 18 * 8)
```

## Remarks

The least common multiple is the smallest multiple of themselves that all the
integers share.

The calculation is based on
[`Numbers.gcd()`]({% link docs/Numbers/gcd.md %}).
