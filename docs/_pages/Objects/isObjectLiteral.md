---
layout:      page
title:       Objects.isObjectLiteral()
module:      Objects
added:       0.0.1
description: Checks if a value was created using object literal syntax (curly
             brackets), that is if it has a prototype other than `Object`.
parameters:
  value: The value to check.
---
## Syntax

```ts
function isObjectLiteral(value: unknown): value is ObjectLiteral
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

console.log(Objects.isObjectLiteral(new Date()));  // -> false
console.log(Objects.isObjectLiteral({ a: 5 }));    // -> true
```

## Remarks

Note that there is no actual way to check how an object was created. Therefore,
this check should be considered an approximation rather than taken as absolute
truth. This function only checks whether the object's prototype is `Object`
(that is, it has no other values in its prototype chain). As a result, calling
`Objects.isObjectLiteral(new Object())` will actually return `true`, even though
the object was not created using object literal syntax.

This function is most useful to ensure that a plain object was passed to your
function, as opposed to, for example, a class instance.

Just like [`Objects.isObject()`]({{ site.baseurl }}{% link _pages/Objects/isObject.md %}), this
function serves as a type guard against an arbitrary
[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)
type with values of type `unknown`, allowing you to safely access any of the
value's properties if the check succeeds.
