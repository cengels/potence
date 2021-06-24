---
layout:      page
title:       Strings.splitAt()
module:      Strings
added:       0.5.0
description: Splits the string at the given indices.
parameters:
  string: The string to split.
  indexes:
    description: The indices to split at. These can be in any order.
                 Negative indices will lead to an error. Duplicate
                 indices are ignored.
    rest: yes
---
## Syntax

```ts
function splitAt(string: string, ...indexes: number[]): string[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.splitAt('banana', 2, 4);  // -> ['ba', 'na', 'na']
Strings.splitAt('bànànà', 2, 4);  // -> ['bà', 'nà', 'nà']
```

## Remarks

Note that the indices correspond to characters, not code points. In other words:
surrogate pairs are not broken apart.
