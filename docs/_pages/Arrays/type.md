---
layout:      page
title:       Arrays.type()
module:      Arrays
description: Checks if the array contains only elements of the given type.
        If the passed type is a `BaseType`, the function will use the `typeof`
        keyword to compare the expected type with the actual type.
        If the type is a constructor, this function will
        use the `instanceof` keyword to compare types. As a result, this
        function honors subtyping. Passing a more generic type than the
        constructor type contained in the array will still make the
        function return true.
parameters:
  array: An array with any number of elements whose type you wish to check.
  type: The type to check the array for.
        Can be either a constructoror a `typeof` result.
---
## Syntax

```ts
function type(array: readonly unknown[], type: BaseType | Constructor): boolean
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example 1

```ts
import { Arrays } from 'potence';

console.log(Arrays.type(['a', 'b', 'c'], 'string'));   // -> true
console.log(Arrays.type(['a', 'b', 5], 'string'));   // -> false
console.log(Arrays.type([new Date()], Date));   // -> true
```

## Example 2

```ts
import { Arrays } from 'potence';

let array: unknown[] = ['a', 'b', 'c'];

if (Arrays.type(array, 'string')) {
    const result = array.reduce((accumulator, current) => {
        // No type error. Even though the array is typed as unknown[],
        // due to the Arrays.type() type guard TypeScript is able to infer
        // that the array is of type string[] here.
        return accumulator += current.toUpperCase();
    }, '');

    console.log(result);   // -> 'ABC'
}
```

## Remarks

This function can be useful to check that a function parameter array really
contains the types you expect.

The reason this function expects a second argument and returns a `boolean`
rather than simply returning the type contained in the array is for three
reasons.

1. You can't have two return types for a function without tuple (which would be
   anything but clean), so to allow a user to check against both a
   [`BaseType`]({% link _pages/Types/BaseType.md %}) and a
   [`Constructor`]({% link _pages/Types/Constructor.md %})
   would require two functions.
2. An array can be *variant*, that is it can contain more than one type. To make
   variant arrays work would then necessitate returning an array of all the
   types contained in the source array, at which point you may as well use
   [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
   for all you've gained.
3. Most importantly, this function serves as a [type
   guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types),
   which means TypeScript automatically considers the array an array of type `T`
   (where `T` is the type you pass to the function) if the function returns
   `true`. This allows you to use the function in a conditional expression and
   use the array in the resulting block as if it were typed with type `T`. See
   [Example 2](#example-2).

The test always returns `true` if the array is empty.
