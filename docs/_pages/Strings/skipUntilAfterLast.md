---
layout:      page
title:       Strings.skipUntilAfterLast()
module:      Strings
added:       0.6.0
description: Returns all characters in the string after the last occurrence
             of the substring.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function skipUntilAfterLast(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.skipUntilAfterLast(string, '.');  // -> "com"
```

## Remarks

If the string does not contain the substring, this function returns an empty
string.

Contrast [`Strings.takeUntilAfterLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfterLast.md %}).
Compare [`Strings.skipUntil()`]({{ site.baseurl }}{% link _pages/Strings/skipUntil.md %}),
[`Strings.skipUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfter.md %}),
[`Strings.skipUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilLast.md %}),
and [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}).
