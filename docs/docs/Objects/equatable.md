---
layout:      page
title:       Objects.equatable()
module:      Objects
description: Attempts to inject a default `equals()` function into the specified object that iterates through all its keys and compares it with the target object.
parameters:
  source: An arbitrary object of any type.
---
## Syntax

```ts
function equatable<T extends Record<string | number | symbol, unknown>>(source: T): Equatable & T
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { Objects } from 'potence';

const nonEquatable = {
    value1: 2,
    value2: '3'
};
const other = { ...nonEquatable };

const equatable = Objects.equatable(nonEquatable);

// Note that equatable() does NOT return a new object.
// It returns the same object, only now it is typed as implementing Equatable.

console.log(equatable === nonEquatable);       // -> true
console.log(equatable.equals(nonEquatable));   // -> true
console.log(equatable === other);              // -> false
console.log(equatable.equals(other));          // -> true
```

## Remarks

It is **strongly recommended** that you *only* use this function with object literals.
Do *not* use this function with prototyped objects. This function does not iterate through
the prototype chain to compare inherited properties or functions, so the generated method
will not provide correct behaviour. If you are writing a class, simply implement `Equatable` manually.

Note that the object to be modified must be [extensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
or this function will throw an error.

This function does nothing if the object to be modified already contains an `equals()` method, regardless
of the arguments it expects and its return value.

See [`Equatable`]({% link docs/Types/Equatable.md %}).
