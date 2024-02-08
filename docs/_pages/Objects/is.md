---
layout:      page
title:       Objects.is()
module:      Objects
added:       0.5.0
updated:     0.6.1
description: Checks if an object is of the given type.
parameters:
  object: An arbitrary value. Can be an object or primitive.
  type: Either one of the possible return types of the `typeof` keyword
        or a constructor.
---
## Syntax

```ts
function is<T>(object: unknown, type: Constructor<T>): object is T;
function is<TTypeOf extends TypeofResult>(object: unknown, type: TTypeOf): object is TTypeOf;
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const date = new Date();

Objects.is(date, Date);            // -> true
Objects.is(date.getTime(), Date);  // -> false
Objects.is(date.getTime(), 'number');  // -> true
```

## Remarks

This function is a combined shorthand for `typeof value === '...'`
and `value instanceof constructor`. As a result, you may or may not
wish to use those keywords directly rather than using this function.
This function is merely a convenience function in case you prefer
using functions to keywords or if you need to negate an `instanceof`
check (`!Objects.is(something, somethingElse)` may be more readable
than `!(something instanceof somethingElse)`).

See
[`TypeofResult`]({{ site.baseurl }}{% link _pages/Types/TypeofResult.md %}).
