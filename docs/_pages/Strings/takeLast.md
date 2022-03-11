---
layout:      page
title:       Strings.takeLast()
module:      Strings
added:       0.6.0
description: Returns the last `count` characters in the string.
parameters:
  string: The string to take characters from.
  count: The number of characters to take from the end of the string.
---
## Syntax

```ts
function takeLast(string: string, count: number): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = '987654321';

Strings.takeLast(string, 5);  // -> "54321"
```

## Remarks

If `string` is shorter than `count`, this function returns the entire string.

If `count` is negative, this function takes from the beginning of the string instead
(see [`Strings.take()`]({{ site.baseurl }}{% link _pages/Strings/take.md %}),
which provides the same functionality).

Contrast [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}).
Compare [`Strings.takeUntil()`]({{ site.baseurl }}{% link _pages/Strings/takeUntil.md %}).
