---
layout:      page
title:       Strings.stripStart()
module:      Strings
added:       0.5.0
description: Returns a new string with all the specified tokens removed
             from the beginning of the string.
parameters:
  from: The string to strip.
  what:
    description: The tokens to remove from the beginning of `from` if found.
                 If not specified, the function will return the original string.
    rest: yes
---
## Syntax

```ts
function stripStart(from: string, ...what: string[]): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'nononoyesno';

Strings.stripStart(string, 'no');  // -> "yesno"
```

## Remarks

Compare [`Strings.stripEnd()`]({{ site.baseurl }}{% link _pages/Strings/stripEnd.md %}).
