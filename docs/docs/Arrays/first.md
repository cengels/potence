---
layout:      page
title:       Arrays.first()
description: Returns the first element in an array. If the array is empty, returns undefined.
parameters:
  array: An array with 0 or more elements from which the "0th" element is returned (but not removed).
---
## Syntax

```ts
function first<T>(array: readonly T[]): T | undefined
```

<p class="description">{{ page.description }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Arrays } from 'potence';

const array = [3, 1, 5];
const firstElement = Arrays.first(array);

console.log(firstElement);   // -> 3
```

## Remarks

This function is functionally equivalent to `array[0]` and is mainly provided for the sake of completeness in regards to [`Arrays.last()`]({% link docs/Arrays/last.md %}).

The only advantage it offers compared to `array[0]` is that, in TypeScript, `array[0]` is *not* type-safe in regards to `undefined` values.
You can freely use `array[0].someFunction()` without null checks and TypeScript will not bark. This function will warn you, however, that its
return value may be undefined.
