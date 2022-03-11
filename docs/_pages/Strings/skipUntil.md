---
layout:      page
title:       Strings.skipUntil()
module:      Strings
added:       0.6.0
description: Returns all characters in the string after the first occurrence
             of the substring, including the substring itself.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function skipUntil(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.skipUntil(string, '://');  // -> "://www.github.com"
```

## Remarks

If the string does not contain the substring, this function returns an empty
string.

Contrast [`Strings.takeUntil()`]({{ site.baseurl }}{% link _pages/Strings/takeUntil.md %}).
Compare [`Strings.skipUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfter.md %}),
[`Strings.skipUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilLast.md %}),
and [`Strings.skip()`]({{ site.baseurl }}{% link _pages/Strings/skip.md %}).
