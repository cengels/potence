---
layout:      page
title:       Objects.isWritable()
module:      Objects
added:       0.5.0
description: Gets a value indicating whether a property can be written to.
parameters:
  object: The object to retrieve the constructor of.
---
## Syntax

```ts
function isWritable(object: unknown, property: string | number | symbol): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const object = {
    writableValue: 5,
    get readonlyValue() { return 5; }
}

Objects.isWritable(object, 'writableValue');  // -> true
Objects.isWritable(object, 'readonlyValue');  // -> false
```

## Remarks

A property can be written to if its `writable` field is `true` or if it has
a setter function associated with it.

This function uses
[`Objects.getPropertyDescriptor()`]({{ site.baseurl }}{% link _pages/Objects/getPropertyDescriptor.md %})
under the hood, so even inherited properties will be processed correctly.

This function is also a type guard, meaning that it will assert that the
property exists on the target if it returns `true`.
