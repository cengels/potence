---
layout:      page
title:       Arrays.last()
module:      Arrays
description: Returns the last element in an array.
             If the array is empty, returns undefined.
parameters:
  array: An array with 0 or more elements from which the
         <code>(n-1)</code>th element is returned (but not removed).
---
## Syntax

```ts
function last<T>(array: readonly T[]): T | undefined
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = [3, 1, 5];
const lastElement = Arrays.last(array);

console.log(lastElement);   // -> 5
```

## Remarks

This function is especially useful for anonymous arrays (arrays that come as a
result of another function and are not stored in a variable) as it saves you
from having to assign it to a temporary variable to be able to write
`array[array.length - 1]`.

This function is analogous to
[`Arrays.first()`]({% link docs/Arrays/first.md %}).
