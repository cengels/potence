---
layout:      page
title:       Assert.instanceOf()
module:      Assert
added:       0.5.0
description: Asserts that a value has a certain prototype in its prototype
             chain.
parameters:
  value: The value to check.
  constructor: Any valid constructor. Does not have to be instantiable.
               The function will check whether `value instanceof constructor`
               evaluates to `true`.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function instanceOf(value: unknown, constructor: Constructor, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function ensureValueIsDate(arg: unknown) {
    Assert.instanceOf(arg, Date, 'arg');
}

ensureValueIsDate(new Date());    // OK
ensureValueIsDate(new Object());  // AssertionError: "Assertion failed: expected arg to be instance of Date but was {}"
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as `if (value instanceof type) { ... }`,
narrowing the type to exclude `null` and `undefined` if possible.
