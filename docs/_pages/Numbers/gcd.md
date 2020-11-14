---
layout:      page
title:       Numbers.gcd()
module:      Numbers
added:       0.0.1
description: Returns the
             [greatest common divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor)
             of two or more integers.
parameters:
  values:
    description: Two or more non-zero integers from which the greatest common
                 divisor should be calculated. If less than two integers are
                 specified, some numbers are floating point numbers, or some
                 numbers are 0, this function will return `0`.
    rest: yes
---
## Syntax

```ts
function gcd(...values: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.gcd(8, 12);          // -> 4
Numbers.gcd(505, 202, 303);  // -> 101
```

## Remarks

The greatest common divisor is the greatest positive integer that divides all
the integers to which it applies without a remainder.

This function uses the
[Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm)
to obtain its result.

Compare [`Numbers.lcm()`]({{ site.baseurl }}{% link _pages/Numbers/lcm.md %}).
