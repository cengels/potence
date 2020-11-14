---
layout:      page
title:       Objects.equal()
module:      Objects
description: Compares two or more objects for equality and returns `true` if all are "equal".
parameters:
  source: An arbitrary object of any type.
  others:
    description: An array of objects of any type you wish to compare with the source object.
    rest: yes
---
## Syntax

```ts
function equal(source: unknown, ...others: unknown[]): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

console.log(Objects.equal(2, 2));   // -> true

const equatable = {
    value: 1,
    equals: function (other: unknown) { return other != null && this.value === other.value;}
};

const nonEquatable = { value: 1 };

console.log(Objects.equal(equatable, nonEquatable));   // -> true
```

## Remarks

"Equality" in this context means one of three things:

* If the source object is a value type (i.e. most primitives), this function
  will directly compare them for *structural equality*, i.e. whether the value
  is the same, not the reference.
* If the source object is a reference type (i.e. objects and arrays), this
  function will compare them for *referential equality*, i.e. whether the
  reference is the same, not the value.
* If the source object implements [`Equatable`]({{ site.baseurl }}{% link _pages/Types/Equatable.md
  %}), this function will call `source.equals()` and return `true` if and only
  if `equals()` returned `true` for every other object.

As a result, this function can compare any type with one another.
