---
layout:      page
title:       Numbers.range()
module:      Numbers
description: Creates a new §Range§ from the given numbers.
permalink:   :path/range()
overloads:
  - signature:  'function range(from: number, to: number): Range'
    description: Creates a new §Range§ from the two bounds.
    parameters:
      from: The left bound of the Range. This is not necessarily the smaller
            value.
      to:   The right bound of the Range. This is not necessarily the larger
            value.
  - signature:  'function range(...values: number[]): Range'
    description: Creates a new §Range§ that spans all the numbers specified.
    parameters:
      values:
        description: |
          All the values that the range should span. The range
          will be between the smallest and the largest element.

          Note that a range must have at least two bounds, so
          specifying less than two numbers here will result
          in an error, and if you specify exactly two numbers
          the other overload will be used instead (in which
          case, unlike here, the order of the arguments
          actually matters).
        rest: yes
---
## Syntax

{% include overloads.md %}

## Example

```ts
import { Numbers } from 'potence';

const range = Numbers.range(10, 5);          // -> Range from 10 to 5 (inverted)
const range2 = Numbers.range(10, 2, 12, 0);  // -> Range from 0 to 12
```

## Remarks

Due to conflicts with the
[`Range`](https://github.com/microsoft/TypeScript/blob/b5b0437a86661c8d7bc76c5860c07305df17899c/lib/lib.dom.d.ts#L12437)
from `lib.dom.d.ts`, you may wish to create a new range using this function
instead of using [`Range`]({% link _pages/Numbers/Range.md %})'s constructor
directly.
