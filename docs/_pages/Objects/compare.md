---
layout:      page
title:       Objects.compare()
module:      Objects
added:       0.0.1
description: Performs a shallow or deep comparison of two objects.
parameters:
  object1: The object to compare against `object2`.
  object2: The object to compare against `object1`.
  comparisonMode: Which type of comparison to use. Possible values are
    `'shallow'` and `'deep'`. A shallow comparison only compares the first
    "level" of properties with each other, whereas a deep comparison also
    compares the properties of nested objects with each other.

    Default is `'shallow'`.
---
## Syntax

```ts
function compare(object1: unknown, object2: unknown, comparisonMode: RecursionMode = 'shallow'): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

// Same contents, different references
const obj1 = { a: 5, b: 'six', c: { d: null } };
const obj2 = { a: 5, b: 'six', c: { d: null } };

console.log(Objects.compare(obj1, obj2, 'shallow'));  // -> false, obj1.c !== obj2.c
console.log(Objects.compare(obj1, obj2, 'deep'));     // -> true
```

## Remarks

Note that this function is distinct from
[`Objects.equal()`]({{ site.baseurl }}{% link _pages/Objects/equal.md %})
in that `compare()` compares the contents of two
objects, whereas `equal()` is meant to be used on values of any type and
checks their structural equality (if it's a primitive), their referential
equality (if it's an object), or calls `obj1.equals(obj2)` (if `obj1` implements
`Equatable`).
