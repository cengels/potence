---
layout:      page
title:       Falsy
module:      Types
description: Attempts to extract all falsy values from a type.
---
## Syntax

```ts
type Falsy<T = unknown>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Falsy } from 'potence';

type A = Falsy<0 | 1 | '' | 'a'>;  // -> 0 | ''
type B = Falsy<boolean>;           // -> false
type C = Falsy<number>;            // -> 0
type D = Falsy<unknown>;           // -> false | 0 | 0n | "" | null | undefined
type E = Falsy<1 | 'a'>;           // -> never
```

## Remarks

Note that there is currently no way to express
[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
as part of a numeric literal (in fact, any value of `NaN` is automatically
inferred as `number`), so `Falsy<T>` will not extract `NaN` from a type.
