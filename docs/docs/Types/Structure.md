---
layout:      page
title:       Structure
module:      Types
description: Represents an object structure that can
             be used in `Objects.structure()`.
             A structure is an object literal where each key corresponds to
             a property and each value corresponds to that property's type.
---
## Syntax

```ts
interface Structure {
    [property: string]: Structure | Constructor | 'bigint' | 'boolean' | 'function' | 'number' | 'string' | 'symbol' | 'array' | 'null' | 'undefined'
                      | Array<Structure | Constructor | 'bigint' | 'boolean' | 'function' | 'number' | 'string' | 'symbol' | 'array' | 'null' | 'undefined'>;
}
```

<div class="description">{{ page.description | markdownify }}</div>

## Example

```ts
const humanStructure: Structure = {
    isAlive: 'boolean',
    birthYear: Date,
    walk: 'function',
    speak: 'function',
    age: 'number',
    firstName: 'string',
    middleName: ['string', 'null'],  // An array with multiple elements matches: one of these types
    lastName: 'string',
    friends: 'array',  // Matches: an array with any number of elements and types
    hobbies: [Hobby],  // An array with a single element matches: an array where each element is this type
    parents: {
        mother: { name: 'string', isAlive: 'boolean' },
        father: { name: 'string', isAlive: 'boolean' }
    }
}
```

## Remarks

See [`Objects.structure()`]({% link docs/Objects/structure.md %}) for more examples.
