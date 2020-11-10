---
layout:      page
title:       Strings.suffix()
module:      Strings
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

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.suffix('awesome-filename', '.md');     // -> 'awesome-filename.md'
Strings.suffix('awesome-filename.md', '.md');  // -> 'awesome-filename.md'
```
