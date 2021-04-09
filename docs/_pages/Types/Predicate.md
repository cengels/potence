---
layout:      page
title:       Predicate
module:      Types
added:       0.5.0
description: Represents a function with one parameter and
             a boolean return value.
---
## Syntax

```ts
type Predicate<T>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Predicate } from 'potence';

const isNotNull: Predicate<unknown> = value => value != null;

[0, 2, null, 5].filter(isNotNull);
```

## Remarks

It is recommended not to use the `Predicate<T>` type in public function
signatures, as most IntelliSense engines will simply display the name of the
type on hover instead of resolving the type alias to the underlying type
signature, which may reduce clarity for consumers of those functions who don't
know what the `Predicate<T>` type stands for.
