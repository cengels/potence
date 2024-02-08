---
layout:      page
title:       TypeofResult
module:      Types
added:       0.0.1
updated:     0.6.1
description: Represents the result of the <code>typeof</code> keyword.
---
## Syntax

```ts
type TypeofResult
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { TypeofResult } from 'potence';

function checkType(object: unknown, type: TypeofResult): boolean {
    return typeof object === type;
}

console.log(checkType('foo', 'string'));   // true
```

## Remarks

The type expands into `'bigint' | 'boolean' | 'function' | 'number' | 'object' |
'string' | 'symbol' | 'undefined'`. Note that these are the `string`s that may
be returned by the `typeof` keyword, not their respective actual types. To get
the actual type from a `TypeofResult`, use
[`Typeof<T>`]({{ site.baseurl }}{% link _pages/Types/Typeof.md %}).
