---
layout:      page
title:       Nullable
module:      Types
description: Represents a type that may be <code>null</code> or
             <code>undefined</code>.
---
## Syntax

```ts
type Nullable<T = unknown>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Nullable } from 'potence';

let variable: Nullable<number> = 5;
variable = null;   // no error
```

## Remarks

Since this type equates to `T | undefined | null`, you may not want to use this
type if your code style is adamant about sticking with either `undefined` or
`null` throughout the code.
