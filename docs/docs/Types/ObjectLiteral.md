---
layout:      page
title:       ObjectLiteral
module:      Types
description: Represents an object literal, i.e. a [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype) composed of a string key and a value.
---
## Syntax

```ts
type ObjectLiteral<T = unknown>
```

<p class="description">{{ page.description | markdownify }}</p>

## Example

```ts
import { ObjectLiteral } from 'potence';

function getValue(object: ObjectLiteral<number>, key: string): number {
    return object[key];
}
```

## Remarks

The `ObjectLiteral` type specifically defines a TypeScript `Record<string, T>`.
In other words, it is a string-keyed map type with no explicitly defined keys.
This is not a type-safe collection—the TypeScript compiler will assume that
any key you access actually exists, even if that key returns a value of `undefined`.
For that reason (and for the ability to delete keys in a well-defined and performant way),
it is generally recommended to use a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
instead.
