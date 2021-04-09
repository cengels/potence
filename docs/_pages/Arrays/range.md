---
layout:      page
title:       Arrays.range()
module:      Arrays
added:       0.5.0
description: Generates an array of numbers between the specified boundaries.
parameters:
  from: The first number that should be included in the generated array.
  to: The boundary after which to stop adding numbers to the array. Note that,
      depending on the step size, this value may or may not be included in the
      array itself.
  step:
    description: The step between each number in the generated range.
                 `1` by default. Note that the step size may not be 0
                 or the function will throw an error.
    optional: yes
---
## Syntax

```ts
function range(from: number, to: number, step: number = 1): number[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.range(5, 10);          // -> [5, 6, 7, 8, 9, 10]
Arrays.range(0.5, 2.2, 0.5);  // -> [0.5, 1.0, 1.5, 2.0]
```

## Remarks

Note that `from` does not need to be smaller than `to`. If `from` is greater
than `to`, the array will be in descending order.

Negative and floating point values are also permitted.
