---
layout:      page
title:       Strings.takeUntilLast()
module:      Strings
added:       0.6.0
description: Returns all characters in the string before the last occurrence
             of the substring.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function takeUntilLast(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.takeUntilLast(string, '.');  // -> "https://www.github"
```

## Remarks

If the string does not contain the substring, this function returns the entire
string.

Contrast [`Strings.skipUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilLast.md %}).
Compare [`Strings.takeUntil()`]({{ site.baseurl }}{% link _pages/Strings/takeUntil.md %}),
[`Strings.takeUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfter.md %}),
[`Strings.takeUntilAfterLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfterLast.md %}),
and [`Strings.takeLast()`]({{ site.baseurl }}{% link _pages/Strings/takeLast.md %}).
