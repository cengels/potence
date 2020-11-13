---
layout:      page
title:       Assert.notNull()
module:      Assert
description: Asserts that a value isn't `null` or `undefined` and throws
             an assertion error if it is.
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
function notNull<T>(value: T, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function doSomething(arg: string | null | undefined) {
    Assert.notNull(arg, 'arg');

    // ...
}

doSomething(123);   // OK
doSomething(null);  // AssertionError: "Assertion failed: expected arg to be non-null but was null"
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as `if (value != null) { ... }`,
narrowing the type to exclude `null` and `undefined` if possible.
