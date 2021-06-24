---
layout:      page
title:       Strings.isWhitespace()
module:      Strings
added:       0.5.0
description: Checks if a string is empty or contains only whitespace.
parameters:
  string: The string to check.
---
## Syntax

```ts
function isWhitespace(string: string): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.isWhitespace('');              // -> true
Strings.isWhitespace('    ');          // -> true
Strings.isWhitespace('banana bread');  // -> false
```

## Remarks

Here whitespace refers to: all the whitespace characters
(space, tab, no-break space, etc.) and all the line terminator
characters (LF, CR, etc.).

Compare [`Strings.isEmpty()`]({{ site.baseurl }}{% link _pages/Strings/isEmpty.md %}).
