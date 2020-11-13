---
layout:      page
title:       Numbers.configure()
module:      Numbers
description: Configures the default tolerance to use for number comparison.
parameters:
  configuration: A configuration object containing any of the below properties.
  configuration.defaultTolerance:
    description: A new default tolerance to use in §Numbers.compare()§.
                 See below for more information.
    optional: yes
---
## Syntax

```ts
interface Configuration {
    defaultTolerance?: number;
}

function configure(configuration: Configuration): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.configure({ defaultTolerance: 0.000001 });
```

## Remarks

If this function is never called, the default tolerance used for
[`Numbers.compare()`]({% link docs/Numbers/compare.md %}) is `0.0000001`. This
value is sufficiently large to cover most floating point inaccuracies that are
likely to occur. If you find this value too high or too low for your
application, it is recommended to call this function once near the entry point
of your application. If you need to use a different tolerance at different
points, you should use `Numbers.compare()`'s third argument instead, which
allows you to specify a custom tolerance for that specific number comparison.

*Important*: As expressed in
[`Numbers.compare()`]({% link docs/Numbers/compare.md %}#on-tolerances),
you *mustn't* assign
[`Number.EPSILON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON)
to the default tolerance. Choose a tolerance appropriate for your application.
For instance, if you know you're only going to deal with or care about the first
4 decimal places, you could use a default tolerance of `0.00001`. If you need
higher precision, use a smaller tolerance. `Number.EPSILON` is much too small to
be useful in the vast majority of instances.
