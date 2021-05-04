---
layout:      page
title:       Assert.notEquals()
module:      Assert
added:       0.5.0
description: Asserts that a value does not equal another
             and throws an assertion error if it does.
parameters:
  actual: The value to check.
  expected: The value to check it with.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function notEquals(actual: unknown, unexpected: unknown, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function getFraction(arg: number) {
    Assert.notEquals(arg, 0);

    return 1 / arg;
}

getFraction(5);   // -> 0.2
getFraction(0);   // AssertionError: "Assertion failed: expected value not to equal 0"
```
