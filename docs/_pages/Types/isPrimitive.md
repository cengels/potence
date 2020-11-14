---
layout:      page
title:       isPrimitive()
module:      Types
description: Type guard that checks whether a value is a primitive.
parameters:
  object: An object whose type isn't known.
---
## Syntax

```ts
function isPrimitive(object: unknown): object is primitive
```
<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { isPrimitive } from 'potence';

let value: unknown = 5;

if (isPrimitive(value)) {
    // In this block, value has the type string | number | bigint | boolean | undefined | symbol.

    // ...
}
```

## Remarks

There are 6 primitive data types: `string`, `number`, `bigint`, `boolean`,
`undefined`, and `symbol`. See
[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) for more
information.

See [`primitive`]({{ site.baseurl }}{% link _pages/Types/primitive.md %}).
