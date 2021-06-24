---
layout:      page
title:       Strings.stripAfter()
module:      Strings
added:       0.5.0
description: Returns a new string with all characters after the given
             substring removed, including the substring itself.
parameters:
  string: The string to strip.
  substring: The substring to look for in `from`. All characters after the
             substring will be removed. The string will effectively end before
             the substring.
  searchBackwards:
    description: This parameter only matters if `string` has multiple
                 occurrences of `substring`. If this is false (default),
                 the function will remove everything after the first
                 occurrence. If true, it will remove everything after
                 the last occurrence.
    optional: yes
---
## Syntax

```ts
function stripAfter(string: string, substring: string, searchBackwards: boolean = false): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

const string = 'Everything after this will be removed.';

Strings.stripAfter(string, 'this');  // -> "Everything after "
```

## Remarks

Compare [`Strings.stripBefore()`]({{ site.baseurl }}{% link _pages/Strings/stripBefore.md %}).
