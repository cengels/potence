---
layout:      page
title:       Strings.skipUntilLast()
module:      Strings
added:       0.6.0
description: Returns all characters in the string after the last occurrence
             of the substring, including the substring itself.
parameters:
  string: The string to take characters from.
  substring: The substring to find within `string`.
---
## Syntax

```ts
function skipUntilLast(string: string, substring: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'https://www.github.com';

Strings.skipUntilLast(string, '.');  // -> ".com"
```

## Remarks

If the string does not contain the substring, this function returns an empty
string.

Contrast [`Strings.takeUntilLast()`]({{ site.baseurl }}{% link _pages/Strings/takeUntilLast.md %}).
Compare [`Strings.skipUntil()`]({{ site.baseurl }}{% link _pages/Strings/skipUntil.md %}),
[`Strings.skipUntilAfter()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfter.md %}),
[`Strings.skipUntilAfterLast()`]({{ site.baseurl }}{% link _pages/Strings/skipUntilAfterLast.md %}),
and [`Strings.skipLast()`]({{ site.baseurl }}{% link _pages/Strings/skipLast.md %}).
