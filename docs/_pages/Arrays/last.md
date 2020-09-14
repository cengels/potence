---
layout: page
title:  "Arrays.last()"
---
Returns the last element in an array. If the array is empty, returns undefined.

### Syntax

```ts
function last<T>(array: readonly T[]): T | undefined
```

* `<T>`: Optional. Type of the passed array items. The array item type is automatically inferred if omitted.
* `array`: An array with 0 or more elements from which the `n - 1`th element is returned (but not removed).

### Remarks

This function is especially useful for anonymous arrays—that is, arrays

This function is analogous to [`Arrays.first()`]({% link _pages/Arrays/first.md %}).
