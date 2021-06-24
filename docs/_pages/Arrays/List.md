---
layout:      class
title:       List
module:      Arrays
added:       0.0.1
updated:     0.5.0
description: Extends the built-in Array object with additional convenience methods
             derived from the `Arrays` module.
order:       -2
---

## Constructor

```ts
public constructor(listLength: number): T[];
public constructor(...items: T[]): T[];
```

<div class="description">
    <p>Creates a list with either a fixed size or from the specified elements.</p>

    <p>Mimics the
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array</a>
    constructor.</p>
</div>

## Public Non-Mutator Methods

<table class="class-members">
    <tr>
        <td class="signature">
            {% highlight ts %}public get(index: number): T{% endhighlight %}
        </td>
        <td class="description">
            <p>Gets the item at the specified index.</p>
            <p markdown="span">
                Unlike bracket syntax (`this[index]`), this function throws an error
                if there is no element at the given index, meaning that the return
                value of this function can never be `undefined` (unless `undefined`
                is part of `T`).
            </p>
        </td>
    </tr>
</table>

## Remarks

See 
[`Arrays`]({{ site.baseurl }}{% link _pages/Arrays/index.md %})
for all functions contained within this class.

Note that, while using `List<T>` is quite convenient and makes for more readable
syntax than the `Arrays` module's free functions, it also commits the entire
`Arrays` module to your code, potentially bloating your bundle size. Therefore
it is recommended only to use `List<T>` if size is not a concern.

There is also a read-only interface of `List<T>` available called
`ReadonlyList<T>`.

To create a new `List<T>` from a given `Array<T>`, you can either spread the
array's items into the list constructor or you can use one of the
available static functions:

```ts
const array = [0, 1, 2];
const list1 = List.from(array);   // preferred
const list2 = new List(...array);
const list3 = List.of(...array);
```
