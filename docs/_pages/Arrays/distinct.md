---
layout:      page
title:       Arrays.distinct()
module:      Arrays
added:       0.4.0
updated:     0.5.0
description: Returns a new array of only the unique values of the iterable
             (without duplicates).
parameters:
  iterable: The iterable you want without duplicates.
---
## Syntax

```ts
function distinct<T>(iterable: Iterable<T>): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const array = ['a', 'a', 'b', 'b', 'c', 'e', 'e', 'e'];

Arrays.distinct(array);  // -> ['a', 'b', 'c', 'e']
```

## Remarks

This function compares values for value types and references for reference
types.

This function uses
[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
internally to remove the duplicate values, so prefer to use Set directly
if you are able to do so.

This function does not modify the original iterable but returns a new array
instead.

Compare
[`Arrays.hasDuplicates()`]({{ site.baseurl }}{% link _pages/Arrays/hasDuplicates.md %}).
