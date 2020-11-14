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
function hasProperty(source: unknown, propertyName: string | number | symbol, type?: BaseType | Constructor): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

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
is generally recommended to use
[`Objects.structure()`]({{ site.baseurl }}{% link _pages/Objects/structure.md %}) instead.

Compare with [`Objects.hasFunction()`]({{ site.baseurl }}{% link _pages/Objects/hasFunction.md %}),
which can check for the presence of functions with a certain number of
arguments.

{% include complex-signature.md %}
