---
layout:      page
title:       Numbers.from()
module:      Numbers
added:       0.5.0
description: Attempts to convert an arbitrary object into a number.
parameters:
  potentialNumber: The object to convert.
---
## Syntax

```ts
function from(potentialNumber: unknown): number | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.from('');              // -> undefined
Numbers.from('  52 ');         // -> 52
Numbers.from('12.534');        // -> 12.534
Numbers.from('2.1E23');        // -> 2.1E23
Numbers.from('banana bread');  // -> undefined
```

## Remarks

As seen in the example above, whitespace on either side of the number string
is okay. Any other character, however, is not.
