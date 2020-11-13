---
layout:      page
title:       Strings.uncapitalize()
module:      Strings
description: Returns a new string with the first letter uncapitalize.
parameters:
  string: The string whose first letter to uncapitalize.
---
## Syntax

```ts
function uncapitalize(string: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.uncapitalize('Hello');  // -> 'hello'
```

## Remarks

If the first character in the string is not a letter, or if it is a lowercase
letter, this function will return the original string.

Contrast [`Strings.capitalize()`]({ % link docs/Types/capitalize.md %}).
