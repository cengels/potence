---
layout:      page
title:       Strings.takeUntil()
module:      Strings
added:       0.6.0
description: Returns all characters in the string before the first occurrence
             of the substring.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function takeUntil(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.takeUntil(string, '://');  // -> "https"
```

## Remarks

If the string does not contain the substring, this function returns the entire
string.

Contrast [`Strings.skipUntil()`]({{ site.baseurl }}{% link _pages/Strings/skipUntil.md %}).
Compare [`Strings.takeUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfter.md %}),
[`Strings.takeUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilLast.md %}),
and [`Strings.take()`]({{ site.baseurl }}{% link _pages/Strings/take.md %}).
