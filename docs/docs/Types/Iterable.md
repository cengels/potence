---
layout:      page
title:       Iterable
module:      Types
description: An interface representing an object that can be iterated over.
---
## Syntax

```ts
interface Iterable<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { Iterable } from 'potence';

function sum(iterable: Iterable<number>): number {
    let sum: number = 0;

    for (const item of iterable) {
        sum += item;
    }

    return sum;
}

sum([0, 1, 2]);           // -> no error
sum(new Set([0, 1, 2]));  // -> no error
```

## Remarks

Any objects that implement `Iterable` can be iterated over using a `for ... of`
loop.

All base collection types (
[arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array),
[Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set),
[Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),
[strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String),
and
[TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
) implement `Iterable` and are assignable to it.

This type also has [a type guard]({% link docs/Types/isIterable.md %}).
