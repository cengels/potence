---
layout:      page
title:       Numbers.mean()
module:      Numbers
description: Gets the average of a sequence of numbers.
parameters:
  values:
    description: The values to average.
                 If no values are provided, this function returns `0`.
    rest: yes
---
## Syntax

```ts
function mean(...values: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.mean(2, 4, 6, 8);  // -> 5
```

## Remarks

This function does not check if a number is impolite, rude, or outright hostile.
In order to check against that, check if it is an
[evil number](https://en.wikipedia.org/wiki/Evil_number).
