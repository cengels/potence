---
layout:      page
title:       Strings.camelCase()
module:      Strings
description: Converts a string to camel case.
parameters:
  source: A string whose casing is either snake_case, ALL_CAPS,
          hyphenated-case, or spaced text. Other types of casing
          are unsupported and may deliver unexpected results.
---
## Syntax

```ts
function camelCase(source: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.camelCase('some string');  // -> 'someString'
Strings.camelCase('some-string');  // -> 'someString'
Strings.camelCase('some_string');  // -> 'someString'
```
