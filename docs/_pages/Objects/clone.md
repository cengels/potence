---
layout:      page
title:       Objects.clone()
module:      Objects
added:       0.5.0
description: Clones any object or value.
parameters:
  object: The object to clone.
  mode:
    description: If mode is "shallow" (default), the function will only clone
                 the object itself. If mode is "deep", the function will
                 recursively clone all fields of the object as well.
    optional: yes
---
## Syntax

```ts
function clone<T>(object: T, mode: RecursionMode = 'shallow'): T
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

Objects.clone(5);                       // -> 5
Objects.clone([1, 2, 3]);               // -> [1, 2, 3]
Objects.clone({ why: 'hello there' });  // -> { why: 'hello there' }

class Dog {
    // private property, so Objects.clone() can't access it
    #superSecretProperty: string;

    constructor(name: string) {
        this.#superSecretProperty = name;
    }

    clone() {
        return new Dog(this.#superSecretProperty);
    }
}

Objects.clone(new Dog('try to clone this!'));
// -> Dog { #superSecretProperty: 'try to clone this!' }
```

## Remarks

The behaviour of this function varies depending on the type of object that
is passed in:

1. If the input value is a primitive or null, returns it unchanged.
   As these are value types, it will automatically be cloned.
2. If the input value has a `clone()` function, calls it and returns the result.
3. If the input value is an array, clones the array.
   If `mode` is "deep", calls `clone()` on each array item.
4. Creates a new object literal and assigns all enumerable properties of object
   to it before returning it. If mode is "deep", calls `clone()` on each
   property value first.

Note that this function can throw an error, for instance if object or one of its
properties is an instance of a class constructor. In that case you probably want
to implement a `clone()` function on the type.

If a property is declared as readonly, this function will silently skip it.
Most of the time this will simply mean a computed property (i.e. a property
with only a getter) which doesn't need its value cloned anyway.
