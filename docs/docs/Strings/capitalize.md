---
layout:      page
title:       Strings.capitalize()
module:      Strings
description: Returns a new string with the first letter capitalized.
parameters:
  string: The string whose first letter to capitalize.
---
## Syntax

```ts
function capitalize(string: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.capitalize('hello');  // -> 'Hello'
```

## Remarks

If the first character in the string is not a letter, or if it is an uppercase
letter, this function will return the original string.

Contrast [`Strings.uncapitalize()`]({ % link docs/Types/uncapitalize.md %}).
