---
layout:      page
title:       Arrays.intersection()
module:      Arrays
added:       0.5.0
description: Creates a new array with only the elements
             that are common to all of the given arrays.
parameters:
  arrays:
    description: The arrays to intersect.
    rest: true
---
## Syntax

```ts
function intersection<T>(...arrays: readonly T[][]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array1 = [0, 1, 2, 3];
const array2 = [2, 3, 4, 5];

Arrays.intersection(array1, array2);  // -> [2, 3]
```
