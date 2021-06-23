---
layout:      page
title:       Arrays.union()
module:      Arrays
added:       0.5.0
description: Creates a new array with all elements from the given arrays,
             excluding duplicates.
parameters:
  arrays:
    description: The arrays to union.
    rest: true
---
## Syntax

```ts
function union<T>(...arrays: readonly T[][]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array1 = [0, 1, 2, 3];
const array2 = [2, 3, 4, 5];

Arrays.union(array1, array2);  // -> [0, 1, 2, 3, 4, 5]
```
