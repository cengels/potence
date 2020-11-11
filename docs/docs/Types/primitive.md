---
layout:      page
title:       primitive
module:      Types
description: Represents a primitive.
---
## Syntax

```ts
type primitive
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { primitive } from 'potence';

let value: primitive = 'foo';   // okay
value = 5;    // okay
value = {};   // error
```

## Remarks

There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`,
`undefined`, and `symbol`. See
[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) for more
information.

The reason this type is not capitalized is a stylistic choice to maintain
consistency with actual primitive types, whose types are also uncapitalized
(think: `string` or `number`).

There is a type guard available for this type: see [`isPrimitive()`]({% link
docs/Types/isPrimitive.md %}).
