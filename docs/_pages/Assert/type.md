---
layout:      page
title:       Assert.type()
module:      Assert
added:       0.5.0
description: Asserts that a value has a certain type.
parameters:
  value: The value to check.
  type: A valid [`typeof` return type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#Description).
        This function checks whether `typeof value === type`.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function type(value: unknown, type: BaseType, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function ensureValueIsNumber(arg: unknown) {
    Assert.type(arg, 'number', 'arg');
}

ensureValueIsNumber(5);        // OK
ensureValueIsNumber('hello');  // AssertionError: 'Assertion failed: expected arg to be of type number but was "hello"'
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as `if (typeof value === type) { ... }`,
narrowing the type to exclude `null` and `undefined` if possible.
