---
layout:      page
title:       Constructor
module:      Types
description: Represents a constructible type (like a class).
             The class may be abstract.
---
## Syntax

```ts
type Constructor<T = unknown>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Constructor } from 'potence';

function checkType<T>(object: unknown, constructor: Constructor<T>): object is T {
    return object instanceof constructor;
}

let value: unknown = new Date();

if (checkType(value, Date)) {
    value.setDate(5);   // no error
    // ...
}
```

## Remarks

Note that constructors of this type cannot be instantiated (i.e. you cannot call
`new ...` on them). If you'd like to type an instantiable constructor, see the
related type [`Instantiable`]({% link _pages/Types/Instantiable.md %}), which
represents a subset of `Constructor` types that can be instantiated (i.e. that
are not abstract).

Every `Instantiable` is a `Constructor`, but not every `Constructor` is an
`Instantiable`.
