---
layout:      page
title:       Strings.isEmpty()
module:      Strings
added:       0.5.0
description: Checks if a string is empty.
parameters:
  string: The string to check.
---
## Syntax

```ts
function isEmpty(string: string): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.isEmpty('');              // -> true
Strings.isEmpty('    ');          // -> false
Strings.isEmpty('banana bread');  // -> false
```

## Remarks

Compare [`Strings.isWhitespace()`]({{ site.baseurl }}{% link _pages/Strings/isWhitespace.md %}).
