---
layout:      page
title:       Strings.skipUntilAfter()
module:      Strings
added:       0.6.0
description: Returns all characters in the string after the first occurrence
             of the substring.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function skipUntilAfter(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.skipUntilAfter(string, '://');  // -> "www.github.com"
```

## Remarks

If the string does not contain the substring, this function returns an empty
string.

Contrast [`Strings.takeUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilAfter.md %}).
Compare [`Strings.skipUntil()`]({{ site.baseurl }}{% link _pages/Strings/skipUntil.md %}),
[`Strings.skipUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilLast.md %}),
[`Strings.skipUntilAfterLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfterLast.md %}),
and [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}).
