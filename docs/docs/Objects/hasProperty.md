---
layout:      page
title:       Objects.hasProperty()
module:      Objects
description: Checks if an object contains a property by the
             specified name and optionally type.
parameters:
  source: The value to check for presence of the property. Accepts any type.
  functionName: The name of the property to check for.
  type:
    description: If passed, `hasProperty()` returns `true` only if the property
                 value matches this type. Possible values include any result of
                 the `typeof` operator as well as any constructor (like `Date`).
    optional: yes
---
## Syntax

```ts
function hasProperty(source: unknown, propertyName: string, type?: BaseType | Constructor): boolean
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Objects } from 'potence';

const object: unknown = { ... };

if (Objects.hasProperty(object, 'count', 'number')) {
    object.count++;  // no error
}
```

## Remarks

This function is a
[type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
When used in an `if` condition, this function will therefore allow you to access
`source[propertyName]` without any TypeScript errors. Note that, unless you
specify `type`, the property's type will be `unknown`.

This function is particularly useful when defining custom type guards, though it
is generally recommended to use [`Objects.structure()`]({% link
docs/Objects/structure.md %}) instead.

Compare with [`Objects.hasFunction()`]({% link docs/Objects/hasFunction.md %}),
which can check for the presence of functions with a certain number of
arguments.

*Side note: this function's signature as described in [Syntax](#syntax) may
differ from its actual signature in `potence`. This is by design: in order to
ensure that this function acts as a type guard, a slightly more complex function
signature is needed. For the purposes of comprehension, that signature is
simplified here.*