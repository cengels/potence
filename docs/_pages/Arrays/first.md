---
layout: page
title:  "Arrays.first()"
---
Returns the first element in an array. If the array is empty, returns undefined.

### Syntax

```ts
function first<T>(array: readonly T[]): T | undefined
```

* `<T>`: Optional. Type of the passed array items. The array item type is automatically inferred if omitted.
* `array`: An array with 0 or more elements from which the "0th" element is returned (but not removed).

### Remarks

This function is functionally equivalent to `array[0]` and is mainly provided for the sake of completeness in regards to [`Arrays.last()`]({% link _pages/Arrays/last.md %}).

The only advantage it offers compared to `array[0]` is that, in TypeScript, `array[0]` is *not* type-safe in regards to `undefined` values.
You can freely use `array[0].someFunction()` without null checks and TypeScript will not bark. This function will warn you, however, that its
return value may be undefined.
