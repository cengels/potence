---
layout:      page
title:       Numbers.sum()
module:      Numbers
added:       0.0.1
description: Gets the sum of a sequence of numbers.
parameters:
  values:
    description: The values to add together.
    rest: yes
---
## Syntax

```ts
function sum(...values: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Numbers.sum(1, 2, 3);  // -> 6
```
