---
layout:      page
title:       Objects.equatable()
module:      Objects
description: Attempts to inject a default `equals()` function into the specified
             object that iterates through all its keys and compares it with the
             target object.
parameters:
  source: An arbitrary object of any type.
---
## Syntax

```ts
function equatable<T extends object>(source: T): Equatable & T
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

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

It is **strongly recommended** that you *only* use this function with object
literals. Do *not* use this function with prototyped objects. This function does
not iterate through the prototype chain to compare inherited properties or
functions, so the generated method will not provide correct behaviour. If you
are writing a class, simply implement `Equatable` manually.

Note that the object to be modified must be
[extensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
or this function will throw an error. This function will also throw an error if
the target object already contains a definition for `equals` that does not match
the `Equatable` interface.

This function does nothing if the object to be modified already contains an
`equals()` method with one parameter, regardless of the return value.

See [`Equatable`]({{ site.baseurl }}{% link _pages/Types/Equatable.md %}).
