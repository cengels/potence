---
layout:      page
title:       Objects.structure()
module:      Objects
description: Type guard that checks if an object
             conforms to the given shape.
parameters:
  object: The object to perform the structural check on.
  struct: A valid `Structure` object that determines
          the desired shape of the object.
  exhaustive:
    description: |
      If true, the check is exhaustive, that is, all properties
      of `object` must match a corresponding property on `struct`. If
      either argument contains keys that the other argument does not
      have, the check fails.

      This is `false` by default, so the check will succeed even if `struct`
      has properties that `object` does not, as long as `object` has all
      properties of `struct`.
    optional: yes
---
## Syntax

```ts
function structure<T extends Structure>(object: object, struct: T): object is MappedStructure<T>
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example 1

```ts
import { Objects, Structure } from 'potence';
import { fetchJson } from 'api.ts';

// Assume you have a function that fetches some JSON from a web API.
// Since the JSON comes from an endpoint you have no control over, you can't
// be sure of its type.

// Note: normally this would be an asynchronous function, however for the sake
// of simplicity let's assume the fetch is a blocking call.
const obj: object = fetchJson();

// Define the shape of the expected JSON.
// It is recommended you define your Structures in another file and import them
// (rather than defining them inline).
const shape: Structure = {
    results: [{
        mandatoryProp: 'string',
        optionalProp: ['number', 'undefined']
    }],
    offset: 'number'
};

// Check whether obj conforms to shape.
if (Objects.structure(obj, shape)) {
    let sum: number = 0;

    obj.results.forEach(result => {               // no error, obj.results is of type array
        if (result.mandatoryProp === 'myProp') {  // no error, result.mandatoryProp is of type string
            sum += result.optionalProp;           // error, optionalProp may be undefined
        }
    });
}
```

## Example 2

```ts
import { Objects } from 'potence';

class Owner { ... }

interface Animal {
    name: string;
    owner?: Owner;
    pastOwners: Owner[];
}

function isAnimal(obj: unknown): obj is Animal {
    return isObject(obj) && Objects.structure(obj, {
        name: 'string',
        owner: [Owner, 'undefined'],  // multiple elements matches either an Owner or undefined
        pastOwners: [Owner]  // single element matches an array containing elements of type Owner
    });
}
```

## Remarks

Due to the fact that this function is a
[type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards),
this makes it an extremely powerful tool for quickly checking whether an unknown
object contains a known set of properties of a known type. As long as you use
this function properly, you should never have to manually cast a value to
another type as TypeScript will understand that the source object corresponds to
the passed object structure if the return type is `true`.

The function can also be especially useful for use in a user-defined type guard,
as seen in [Example 2](#example-2) above, even though you lose the advantages of
`Objects.structure()`'s own type guard this way.

See [`Structure`]({% link _pages/Types/Structure.md %}) for detailed information
on the `Structure` type as well as a complete example showing all possible
values.
