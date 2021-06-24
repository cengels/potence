---
layout:      page
title:       Strings.prefix()
module:      Strings
added:       0.2.0
description: Adds a prefix to a string if it does not yet exist.
parameters:
  string: The string to prefix.
  prefix: The prefix to add. If the string already starts with this prefix,
          this function does nothing.
---
## Syntax

```ts
function prefix(string: string, prefix: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.prefix('www.google.com', 'https://');          // -> 'https://www.google.com'
Strings.prefix('https://www.google.com', 'https://');  // -> 'https://www.google.com'
```

## Remarks

Compare [`Strings.suffix()`]({{ site.baseurl }}{% link _pages/Strings/suffix.md %}).
