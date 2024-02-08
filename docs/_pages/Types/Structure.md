---
layout:      page
title:       Structure
module:      Types
added:       0.0.1
updated:     0.6.1
description: Represents an object structure that can
             be used in §Objects.structure()§.
             A structure is an object literal where each key corresponds to
             a property and each value corresponds to a *matcher*.
             A matcher is a $Predicate$ that returns `true` if the value matches
             some type.
---
## Syntax

```ts
interface Structure {
    [property: string]: Predicate<unknown> | Structure;
}
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
const humanStructure: Structure = {
    isAlive: boolean(),
    birthYear: instanceOf(Date),
    walk: func(),
    speak: func(),
    age: number(),
    firstName: string(),
    middleName: oneOf(string(), nullish()),
    lastName: string(),
    friends: array(),  // Matches: an array with any number of elements and types
    hobbies: arrayOf(instanceOf(Hobby)),
    parents: {
        mother: { name: string(), isAlive: boolean() },
        father: { name: string(), isAlive: boolean() }
    }
}
```

## Remarks

All the shown matchers come from the `fluent` module. Due to possible API changes these are not yet documented,
but all the matchers currently implemented are considered stable and unlikely to be subject to change.

See [`Objects.structure()`]({{ site.baseurl }}{% link _pages/Objects/structure.md %}) for more examples.
