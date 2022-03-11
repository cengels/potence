---
layout:      page
title:       Strings.skipLast()
module:      Strings
added:       0.6.0
description: Skips the last `count` characters in the string
             and returns the rest.
parameters:
  string: The string to take characters from.
  count: The number of characters to skip over.
---
## Syntax

```ts
function skipLast(string: string, count: number): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = '987654321';

Strings.skipLast(string, 5);  // -> "9876"
```

## Remarks

If `string` is shorter than `count`, this function skips over the entire string
and returns an empty string.

If `count` is negative, this function skips from the beginning of the string instead
(see [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}),
which provides the same functionality).

Contrast [`Strings.take()`]({{ site.baseurl }}{% link _pages/Strings/take.md %}).
Compare [`Strings.skipUntil()`]({{ site.baseurl }}{% link _pages/Strings/skipUntil.md %}).
