---
layout:      page
title:       Arrays.clone()
module:      Arrays
added:       0.0.1
description: Returns a copy of an array.
parameters:
  array: The array that should be cloned.
---
```ts
function clone<T>(array: readonly T[]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = [0, 1, 2, 3, 4, 5];
const array2 = Arrays.clone(array);

array2.length = 3;

console.log(array);   // -> [0, 1, 2, 3, 4, 5]
console.log(array2);  // -> [0, 1, 2]
```

## Remarks

There are several different ways to clone an array in JavaScript. Some of those
ways are, in practice, superior to others, either because of performance or
because of syntax. This function removes those considerations from your mind: it
will always use the method which performs the best in most browsers while also
maintaining a clear and concise syntax.

Note that this function returns a shallow copy. If you'd like to clone not just
the array but also the values inside, consider using
[`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
instead.
