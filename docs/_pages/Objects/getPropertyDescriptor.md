---
layout:      page
title:       Objects.getPropertyDescriptor()
module:      Objects
added:       0.5.0
description: Returns a property descriptor for the given property
             on the object.
parameters:
  object: The object on which the property resides.
  property: The key of the property whose information to retrieve.
---
## Syntax

```ts
function getPropertyDescriptor(object: unknown, property: string | number | symbol): PropertyDescriptor | undefined
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

class Base {
    public value(): number {
        return 5;
    }
}
class Inherited extends Base { }

const inherited = new Inherited();

Objects.getPropertyDescriptor(inherited, 'value')!.value();  // -> 5
```

## Remarks

See
[`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
for a description of how property descriptors work.

The only difference between
this function and `Object.getOwnPropertyDescriptor()` is that this function
also travels down the object's prototype chain until it finds a property
of the specified name or until it reaches the end of the chain.
As such, this function is well-suited for working with generic objects
with inheritance chains. Be aware, however, that the time complexity of this
function rises the further down the prototype chain the target property resides.
