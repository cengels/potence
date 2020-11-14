---
layout:      page
title:       Assert.truthy()
module:      Assert
added:       0.0.1
updated:     0.4.0
description: Asserts that a value is
             [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
             and throws an assertion error if it isn't.
parameters:
  value: The value to check.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function truthy<T>(value: T, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function doSomething(arg: string) {
    Assert.truthy(arg, 'arg');

    // ...
}

doSomething('hello');  // OK
doSomething('');       // AssertionError: 'Assertion failed: expected arg to be truthy but was ""'
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as `if (value) { ... }`,
narrowing the type to exclude `null`, `undefined`, and `false`,
among others.
