---
layout:      page
title:       Objects.getConstructor()
module:      Objects
added:       0.5.0
description: Gets the constructor of an object.
parameters:
  object: The object to retrieve the constructor of.
---
## Syntax

```ts
function getConstructor<T>(object: T): Constructor<T> | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const date = new Date();
const constructor = Objects.getConstructor(date);
const date2 = new constructor();
```

## Remarks

In JavaScript, *all* values\* have a retrievable constructor, even primitives
like numbers and strings. When working with constructors in a generic manner,
retrieving these primitive constructors is usually not what you want, so the
following object types will return `undefined` instead of their constructor:

* All primitives (including numbers, strings, big ints, etc.)
* Objects whose immediate prototype is
  [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  (object literals)
* Arrays whose immediate prototype is
  [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  (excluding custom arrays)

If you'd like to obtain those constructors as well, use the
[`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
property.

<small>\* With the exception of objects created using `Object.create(null)`</small>
