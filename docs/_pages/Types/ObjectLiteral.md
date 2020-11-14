---
layout:      page
title:       ObjectLiteral
module:      Types
added:       0.0.1
updated:     0.3.0
description: Represents an object with an index signature keyed to a `string`,
             `number`, or `symbol`.
---
## Syntax

```ts
type ObjectLiteral<T = unknown>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { ObjectLiteral } from 'potence';

function getValue(object: ObjectLiteral<number>, key: string): number {
    return object[key];
}
```

## Remarks

This type is an alias for
[`Record<string | number | symbol, T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype).
Note that, as a `Record`, this type is not type-safe. Unless you explicitly
define a nullable `T`, TypeScript will assume that any key you access actually
exists.

If you need a dictionary-type object, it is generally recommended to use a
[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
instead.

If you need an object literal without an index signature (i.e. a non-primitive)
use `object`. Note that this will not allow you to access arbitrary keys but
*will* allow you to assign it any non-primitive (whereas ObjectLiteral requires
an object with an index signature).

For this reason, it is recommended that you only use this type in covariant
contexts, for example as the return type of a function. Prefer the `object` type
for parameters, as that will allow you to pass in any object, even those without
an index signature.
