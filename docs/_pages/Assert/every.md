---
layout:      page
title:       Assert.every()
module:      Assert
order:       99
added:       0.0.1
updated:     0.4.0
description: Asserts that every element of an array passes an arbitrary
             assertion.
parameters:
  array: The array whose elements to check.
  callback: |
    A callback that will be called once for every array element and should
    throw an assertion error (via one of the other assertion functions)
    if the element does not pass the assertion.

    Note that this function has no effect if you return a `boolean`. You must
    use one of the other assertion functions inside the callback.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function every<T>(array: readonly T[], callback: (value: T, index: number) => void, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

const bits = [1, 1, 1, 1, 0, 1];

Assert.every(bits, bit => Assert.truthy(bit), 'bits');
// AssertionError: "bits failed assertion. Element at index 4 reported:
// "Assertion failed: expected truthy value but got 0"
```

## Remarks

If the assertion fails, the error message prints out the index of the first
element which failed, along with the failure message of the "inner" assertion
error.

Note that iteration over the array stops as soon as one of the callbacks throws
an assertion error.
