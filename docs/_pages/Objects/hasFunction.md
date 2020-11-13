---
layout:      page
title:       Objects.hasFunction()
module:      Objects
description: Checks if an object contains a function by the specified name
             and number of arguments.
parameters:
  source: The value to check for presence of the function. Accepts any type.
  functionName: The name of the function to check for.
  argumentCount:
    description: If passed, `hasFunction()` returns `false` if the function
                 does not accept this exact number of arguments.
    optional: yes
---
## Syntax

```ts
function hasFunction(source: unknown, functionName: string | number | symbol, argumentCount?: number): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const object: unknown = { ... };

if (Objects.hasFunction(object, 'doSomething', 2)) {
    object.doSomething('with', 'me');  // no error
}
```

## Remarks

This function is a
[type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
When used in an `if` condition, this function will therefore allow you to call
`source[functionName]()` without any TypeScript errors.

Note that, because it is not possible to perform a runtime check for the type of
parameters or the return type, both of these will be typed as `unknown`. In
other words: you will be able to pass an arbitrary number of arguments of any
type to the function, but to use the function's return type you'll have to
perform another type check.

This function is particularly useful when defining custom type guards.

Compare with [`Objects.hasProperty()`]({% link _pages/Objects/hasProperty.md %}),
which can check for the presence of properties of other types.

{% include complex-signature.md %}
