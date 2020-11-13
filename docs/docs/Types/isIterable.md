---
layout:      page
title:       isIterable()
module:      Types
description: Type guard that checks whether a value is an §Iterable§.
parameters:
  object: An object whose type isn't known.
---
## Syntax

```ts
function isIterable(object: unknown): object is Iterable<unknown>
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { isIterable } from 'potence';

let variable: unknown;

if (isIterable(variable)) {
    // Can now use for ... of loop here
    for (const element of variable) {
        ...
    }
}
```

## Remarks

See [`Iterable`]({% link docs/Types/Iterable.md %}).
