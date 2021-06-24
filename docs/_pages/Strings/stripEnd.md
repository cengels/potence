---
layout:      page
title:       Strings.stripEnd()
module:      Strings
added:       0.5.0
description: Returns a new string with all the specified tokens removed
             from the end of the string.
parameters:
  from: The string to strip.
  what:
    description: The tokens to remove from the end of `from` if found.
                 If not specified, the function will return the original string.
    rest: yes
---
## Syntax

```ts
function stripEnd(from: string, ...what: string[]): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'nononoyesnono';

Strings.stripEnd(string, 'no');  // -> "nononoyes"
```

## Remarks

Compare [`Strings.stripStart()`]({{ site.baseurl }}{% link _pages/Strings/stripStart.md %}).
