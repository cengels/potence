---
layout:      page
title:       Strings.prefix()
module:      Strings
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

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.prefix('www.google.com', 'https://');          // -> 'https://www.google.com'
Strings.prefix('https://www.google.com', 'https://');  // -> 'https://www.google.com'
```
