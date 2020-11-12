---
layout:      page
title:       Arrays.hasDuplicates()
module:      Arrays
description: Checks whether an array contains duplicate values or references.
parameters:
  array: The array you want to check.
---
## Syntax

```ts
function hasDuplicates<T>(array: readonly T[]): T[]
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

Arrays.hasDuplicates([0, 1, 2]);  // -> false
Arrays.hasDuplicates([0, 1, 1]);  // -> true
```

## Remarks

This function compares values for value types and references for reference
types.

This function uses
[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
internally to check for duplicates, so prefer to use Set directly if you are
able to do so.
