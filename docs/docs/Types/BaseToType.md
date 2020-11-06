---
layout:      page
title:       BaseToType
module:      Types
description: Utility type that transforms a <code>BaseType</code> into the type
             it represents.
---
## Syntax

```ts
type BaseToType<T>
```

<p class="description">{{ page.description | markdownify }}</p>

## Example

```ts
import { BaseType, BaseToType } from 'potence';

function checkType<T extends BaseType>(object: unknown, type: T): object is BaseToType<T> {
    return typeof object === type;
}

let object: unknown = 'foo';

if (checkType(object, 'string')) {
    // In this block, TypeScript knows that object is of type string

    object = object.toLowerCase();   // no error
}
```

## Remarks

See [`BaseType`]({% link docs/Types/BaseType.md %}).
