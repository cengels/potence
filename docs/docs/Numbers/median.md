---
layout:      page
title:       Numbers.median()
module:      Numbers
description: Gets the [median](https://en.wikipedia.org/wiki/Median)
             of a sequence of numbers.
parameters:
  values:
    description: |
                 The values from which to determine the median.
                 The values do not have to be sorted.

                 If there are an odd number of values, this function extracts
                 the middle value.

                 If there are an even number of values, this function extracts
                 the average of the middle two values.
    rest: yes
---
## Syntax

```ts
function median(...values: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.median(9, 2, 3);      // -> 3
Numbers.median(9, 4, 1, 10);  // -> 6.5
```

## Remarks

If the sequence is not sorted, this function will sort it first.
