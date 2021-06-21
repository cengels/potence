---
layout:      page
title:       ExcludeProps
module:      Types
added:       0.5.0
description: Excludes from T the properties whose values are assignable to U.
---
## Syntax

```ts
type ExcludeProps<T, U>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { ExcludeProps } from 'potence';

interface A {
    a: string;
    b: string;
    c: number;
    d: Date;
}

ExcludeProps<A, string>  // -> { c: number, d: Date }
```

## Remarks

This type is similar to
[`Omit<T, U>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys).
However, `Omit<T, U>` filters properties based on their **keys**, whereas this
type filters properties based on their **values**.

This type does not currently work well with union or inherited types.
