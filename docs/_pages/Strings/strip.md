---
layout:      page
title:       Strings.strip()
module:      Strings
added:       0.0.1
updated:     0.5.0
description: Returns a new string with all the specified tokens removed.
parameters:
  from: The string to strip.
  what:
    description: The tokens to remove from `from` if found. If not specified,
                 the function will return the original string.
    rest: yes
---
## Syntax

```ts
function strip(from: string, ...what: string[]): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'T&hi%s i$s a !string w&ith str!ange ch$aracters in it.';

Strings.strip(string, '%' '!', '&', '$');
// -> 'This is a string with strange characters in it.'
```

## Remarks

This function removes *all* occurrences of the tokens specified by `what`, not
just the first one.
