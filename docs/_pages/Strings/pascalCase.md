---
layout:      page
title:       Strings.pascalCase()
module:      Strings
added:       0.5.0
description: Converts a string to PascalCase.
parameters:
  source: A string whose casing is either snake_case, ALL_CAPS,
          hyphenated-case, or spaced text. Other types of casing
          are unsupported and may deliver unexpected results.
---
## Syntax

```ts
function pascalCase(source: string): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.pascalCase('some string');  // -> 'SomeString'
Strings.pascalCase('some-string');  // -> 'SomeString'
Strings.pascalCase('some_string');  // -> 'SomeString'
```

## Remarks

Compare [`Strings.camelCase()`]({{ site.baseurl }}{% link _pages/Strings/camelCase.md %}).
