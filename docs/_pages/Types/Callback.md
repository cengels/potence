---
layout:      page
title:       Callback
module:      Types
added:       0.5.0
description: Represents a function with one parameter and
             a generic return value.
---
## Syntax

```ts
type Callback<T, U = void>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Callback } from 'potence';

const toFixed: Callback<number, string> = value => value.toFixed();

[0.2, 0.3, 0.4].map(toFixed);
```

## Remarks

It is recommended not to use the `Callback<T, U>` type in public function
signatures, as most IntelliSense engines will simply display the name of the
type on hover instead of resolving the type alias to the underlying type
signature, which may reduce clarity for consumers of those functions who don't
know what the `Callback<T, U>` type stands for.
