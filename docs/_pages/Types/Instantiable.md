---
layout:      page
title:       Instantiable
module:      Types
added:       0.0.1
updated:     0.4.0
description: Represents an instantiable ("newable") type.
---
## Syntax

```ts
type Instantiable<T = unknown, Args extends ReadonlyArray<unknown> = []>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Instantiable } from 'potence';

const instantiables: Instantiable[] = [
    Date,
    Object,
    CustomClass
];

const instances = instantiables.map(instantiable => new instantiable());
```

## Remarks

Particularly useful for factory functions. See above for a possible usage
example.

The second type `Args` allows consumers to specify the types of any parameters
the constructor may have as a
[tuple](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple).

Also see the related type [`Constructor`]({{ site.baseurl }}{% link _pages/Types/Constructor.md %}),
which is the superset of this type, only that a `Constructor` may also refer to
an abstract constructor (for instance an abstract class) that cannot be
instantiated.

Every `Instantiable` is a `Constructor`, but not every `Constructor` is an
`Instantiable`.
