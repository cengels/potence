---
layout:      page
title:       Strings.takeUntilAfter()
module:      Strings
added:       0.6.0
description: Returns all characters in the string before the first occurrence
             of the substring, including the substring itself.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function takeUntilAfter(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.takeUntilAfter(string, '://');  // -> "https://"
```

## Remarks

If the string does not contain the substring, this function returns the entire
string.

Contrast [`Strings.skipUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfter.md %}).
Compare [`Strings.takeUntil()`]({{ site.baseurl }}{% link _pages/Strings/takeUntil.md %}),
[`Strings.takeUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilLast.md %}),
[`Strings.takeUntilAfterLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfterLast.md %}),
and [`Strings.take()`]({{ site.baseurl }}{% link _pages/Strings/take.md %}).
