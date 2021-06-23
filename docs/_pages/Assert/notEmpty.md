---
layout:      page
title:       Assert.notEmpty()
module:      Assert
added:       0.5.0
description: Asserts that an array-like or iterable isn't empty
             and throws an assertion error if it is.
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
function notEmpty(iterable: Iterable<unknown>, name?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function getFirst(array: number[]): number {
    Assert.notEmpty(array);

    return array[0];
}

getFirst([1]);  // -> 1
getFirst([]);   // AssertionError: "Assertion failed: expected iterable not to be empty but had 0 elements"
```
