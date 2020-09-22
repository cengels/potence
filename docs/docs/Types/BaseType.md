---
layout:      page
title:       BaseType
module:      Types
description: Represents the result of the <code>typeof</code> keyword.
---
## Syntax

```ts
type BaseType
```

<p class="description">{{ page.description }}</p>

## Example

```ts
import { BaseType } from 'potence';

function checkType(object: unknown, type: BaseType): boolean {
    return typeof object === type;
}

console.log(checkType('foo', 'string'));   // true
```

## Remarks

The type expands into `'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'`.
Note that these are the `string`s that may be returned by the `typeof` keyword, not their respective actual types.
To get the actual type from a BaseType, use [`BaseToType<T>`]({% link docs/Types/BaseToType.md %}).