---
layout:      page
title:       Strings.take()
module:      Strings
added:       0.6.0
description: Returns the first `count` characters in the string.
parameters:
  string: The string to take characters from.
  count: The number of characters to take from the beginning of the string.
---
## Syntax

```ts
function take(string: string, count: number): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = '123456789';

Strings.take(string, 5);  // -> "12345"
```

## Remarks

If `string` is shorter than `count`, this function returns the entire string.

If `count` is negative, this function takes from the end of the string instead
(see [`Strings.takeLast()`]({{ site.baseurl }}{% link _pages/Strings/takeLast.md %}),
which provides the same functionality).

Contrast [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}).
Compare [`Strings.takeUntil()`]({{ site.baseurl }}{% link _pages/Strings/takeUntil.md %}).
