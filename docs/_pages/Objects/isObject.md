---
layout:      page
title:       Objects.isObject()
module:      Objects
description: Checks if a value is an object (that is, not a primitive).
parameters:
  value: The value to check.
---
## Syntax

```ts
function isObject(value: unknown): value is ObjectLiteral
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const obj: unknown = ...;

if (Objects.isObject(obj)) {
    obj['a'] = 5;  // no error
}
```

## Remarks

This check returns `false` on `null` (even though JavaScript itself considers
`null` to be an object), but returns `true` on objects, functions, and arrays.

This function can be useful to check whether properties are supported on a
value. In other words, if this check succeeds, you can safely access properties
on the value using bracket syntax (e.g. `value['myProp']`).

Note that, even though bracket syntax can be used if the check succeeds, there
is still no way to know if a property exists on the type or, if it does, what
type it is. Therefore, all properties will be typed as `unknown`. To check
whether a specific property exists on a type, prefer either
[`Objects.hasProperty()`]({% link _pages/Objects/hasProperty.md %}) or
[`Objects.structure()`]({% link _pages/Objects/structure.md %}).

Compare [`primitive`]({% link _pages/Types/primitive.md %}) and
[`isPrimitive()`]({% link _pages/Types/isPrimitive.md %}).

## For TypeScript Users

The function's return type is `value is ObjectLiteral`.
[`ObjectLiteral`]({% link _pages/Types/ObjectLiteral.md %})
is a helper type to mean "a
[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)
of any valid key type and the specified value type" (by default: `unknown`).

In other words: in this context, `ObjectLiteral` only means that the object has
an arbitrary index signature, i.e. that you can access any key without a
TypeScript (or runtime) error, because ensuring that is the most likely reason
to use this function at all.

It does not mean that the value is literally an
[object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals),
that is an object created via curly bracket syntax. If you'd like to check if an
object was created using curly bracket syntax, use
[`Objects.isObjectLiteral()`]({% link _pages/Objects/isObjectLiteral.md %}).
