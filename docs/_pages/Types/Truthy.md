---
layout:      page
title:       Truthy
module:      Types
added:       0.4.0
description: Attempts to remove all falsy types from another type.
---
## Syntax

```ts
type Truthy<T>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Truthy } from 'potence';

type A = Truthy<0 | 1 | '' | 'a'>;  // -> 1 | 'a'
type B = Truthy<boolean>;           // -> true
type C = Truthy<number>;            // -> number (can't narrow non-literal types)
type D = Truthy<unknown>;           // -> unknown
type E = Truthy<0 | ''>;            // -> never
```

## Remarks

Unlike [`Falsy<T>`]({{ site.baseurl }}{% link _pages/Types/Falsy.md %}), there is no clearly defined
set of "truthy" values. Truthy values are instead all those that are not one
of the known falsy values. As a result, it isn't possible to exclude all falsy
values from a non-literal type like `number`. `Truthy<number>` will simply
evaluate back to `number` because TypeScript currently has no way to express
`all numbers except those assignable to T`. This makes this type most useful
with
[literal types](https://www.typescriptlang.org/docs/handbook/literal-types.html).

That's also why the type parameter `T` is not optional in this case (whereas it
*is* optional in `Falsy<T>`).

Click [here](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) for more
information on "truthiness" as a concept.
