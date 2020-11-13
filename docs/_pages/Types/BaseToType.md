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

<div class="description">{% include linkify.html description=page.description %}</div>

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

See [`BaseType`]({% link _pages/Types/BaseType.md %}).
