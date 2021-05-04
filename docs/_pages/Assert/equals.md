---
layout:      page
title:       Assert.equals()
module:      Assert
added:       0.5.0
description: Asserts that a value equals another
             and throws an assertion error if it doesn't.
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
function equals<T>(actual: unknown, expected: T, name?: string): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function doSomething(arg: number) {
    for (; arg < 5; arg++) {

    }

    Assert.equals(arg, 5);
}

doSomething(2);   // OK, loops runs three times
doSomething(7);   // AssertionError: "Assertion failed: expected 5 but got: 7"
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as `if (value === otherValue) { ... }`,
narrowing the type to the type of `otherValue` if the function passes.
