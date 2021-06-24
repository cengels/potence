---
layout:      page
title:       Strings.stripBefore()
module:      Strings
added:       0.5.0
description: Returns a new string with all characters before the given
             substring removed, including the substring itself.
parameters:
  string: The string to strip.
  substring: The substring to look for in `from`. All characters before the
             substring will be removed. The string will effectively start after
             the substring.
  searchBackwards:
    description: This parameter only matters if `string` has multiple
                 occurrences of `substring`. If this is false (default),
                 the function will remove everything before the first
                 occurrence. If true, it will remove everything before
                 the last occurrence.
    optional: yes
---
## Syntax

```ts
function stripBefore(string: string, substring: string, searchBackwards: boolean = false): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'Everything before this will be removed.';

Strings.stripBefore(string, 'this');  // -> " will be removed."
```

## Remarks

Compare [`Strings.stripAfter()`]({{ site.baseurl }}{% link _pages/Strings/stripAfter.md %}).
