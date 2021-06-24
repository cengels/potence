---
layout:      page
title:       Strings.suffix()
module:      Strings
added:       0.2.0
description: Adds a suffix to a string if it does not yet exist.
parameters:
  string: The string to suffix.
  suffix: The suffix to add. If the string already ends with this suffix,
          this function does nothing.
---
## Syntax

```ts
function suffix(string: string, suffix: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.suffix('awesome-filename', '.md');     // -> 'awesome-filename.md'
Strings.suffix('awesome-filename.md', '.md');  // -> 'awesome-filename.md'
```

## Remarks

Compare [`Strings.prefix()`]({{ site.baseurl }}{% link _pages/Strings/prefix.md %}).
