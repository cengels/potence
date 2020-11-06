---
layout:      page
title:       Equatable
module:      Types
description: An interface representing an object that has an `equals()` method
             and can be equated to another.
---
## Syntax

```ts
interface Equatable {
    equals(object: unknown): boolean;
}
```

<div class="description">{{ page.description | markdownify }}</div>

## Example

```ts
import { Equatable } from 'potence';

class CodeEditor implements Equatable {
    public name: string = 'Visual Studio Code';
    public users: number = 5000000;
    public size: number = 300000000;

    public equals(other: unknown): boolean {
        return other instanceof CodeEditor
            && this.name === other.name
            && this.users === other.users
            && this.size === other.size;
    }
}
```

## Remarks

The reason that Equatable does not have a generic is because it is impossible to
check for generics in type constraints (i.e. [`isEquatable()`]({% link
docs/Types/isEquatable.md %})), which would cause potential uncaught runtime
exceptions when calling `equals()` with an unexpected object type.

In other words: you must always implement `equals()` with a parameter type of
`unknown` because you cannot be sure that consumers of this interface won't pass
an unexpected object into the function.

This interface is used in some functions belonging to the [`Objects`]({% link
docs/Objects/index.md %}) and [`Arrays`]({% link docs/Arrays/index.md %}) module
to compare two arbitrary objects with each other (if the interface is
implemented). If you use functions like [`Objects.equal()`]({% link
docs/Objects/equal.md %}) or [`Arrays.groupBy()`]({% link docs/Arrays/groupBy.md
%}), you can manipulate the way those functions compare two objects by
implementing this interface.

You can use [`Objects.equatable()`]({% link docs/Objects/equatable.md %}) to
inject a generic `equals()` method into a given object that shallowly compares
all of the object's keys.

When implementing an `equals()` method, it is recommended to use `instanceof` to
ensure the other object is of the same type if you are implementing `Equatable`
in a class.
