---
layout:      page
title:       Assert.empty()
module:      Assert
added:       0.5.0
description: Asserts that an array-like or iterable has no elements
             and throws an assertion error if it does.
parameters:
  iterable: An iterable which may or may not be empty.
  name:
    description: A variable, property, or parameter name which, if specified,
                 will print the name as part of the assertion error to make it
                 more clear where the error originated.
    optional: yes
---
## Syntax

```ts
function empty(iterable: Iterable<unknown>, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function addElementsIfEmpty(array: number[]): number[] {
    Assert.empty(array);

    array.push(1, 2, 3);

    return array;
}

addElementsIfEmpty([]);   // OK, elements added
addElementsIfEmpty([1]);  // AssertionError: "Assertion failed: expected empty iterable but got iterable with 1 element"
```
