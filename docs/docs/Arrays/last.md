---
layout:      page
title:       "Arrays.last()"
description: "Returns the last element in an array. If the array is empty, returns undefined."
parameters:
  array: An array with 0 or more elements from which the `n - 1`th element is returned (but not removed).
---
## Syntax

```ts
function last<T>(array: readonly T[]): T | undefined
```

<p class="description">{{ page.description }}</p>
{% include parameters.html parameters=page.parameters %}

## Remarks

This function is especially useful for anonymous arrays—that is, arrays

This function is analogous to [`Arrays.first()`]({% link docs/Arrays/first.md %}).
