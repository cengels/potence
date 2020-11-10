---
layout:      page
title:       Arrays.zip()
module:      Arrays
description: Combines two or more arrays, creating a new two-dimensional array
             where each element is a tuple of each element at that index.
parameters:
  source: The first array to combine.
  arrays:
    description: The other arrays to combine with `source`. Every array must
                 have the same number of elements as `source`.
    rest: yes
---
## Syntax

```ts
function zip(source: unknown[], ...arrays: unknown[][]): TransformedArrays
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const strings = ['apple', 'banana', 'orange'];
const stringLengths = strings.map(string => string.length);

Arrays.zip(strings, stringLengths);
// Result:
// [
//    ['apple', 5],
//    ['banana', 6],
//    ['orange', 6]
// ]
```

## Remarks

{% include complex-signature.md %}
