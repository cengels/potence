---
layout:      page
title:       ArrayType
module:      Types
description: Utility type that extracts the element type from an array type.
---
## Syntax

```ts
type ArrayType<T>
```

<p class="description">{{ page.description }}</p>

## Example 1

```ts
import { ArrayType } from 'potence';

type Foo = ArrayType<Array<string>>                     // Foo is of type string
type Bar = ArrayType<Array<number | string | symbol>>   // Bar is of type number | string | symbol
```

## Example 2

```ts
import { ArrayType } from 'potence';

function foo<T extends unknown[]>(array: T): ArrayType<T> {
    return array[0];
}
```

## Remarks

This type is primarily useful with other generics, such as in the second example above.
Even in those cases, though, it is generally preferable to use a type `T[]` instead and
then simply return `T`, unless you *really* need an array type, not an array element type.
