---
layout:      page
title:       Arrays.hasDuplicates()
module:      Arrays
added:       0.4.0
updated:     0.5.0
description: Checks whether an iterable contains duplicate values or references.
parameters:
  array: The iterable you want to check.
---
## Syntax

```ts
function hasDuplicates(iterable: Iterable<unknown>): boolean
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

Compare
[`Arrays.distinct()`]({{ site.baseurl }}{% link _pages/Arrays/distinct.md %}).
