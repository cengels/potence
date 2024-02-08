---
layout:      page
title:       Typeof
module:      Types
added:       0.0.1
description: Utility type that transforms a <code>TypeofResult</code> into the type
             it represents.
---
## Syntax

```ts
type Typeof<T>
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { TypeofResult, Typeof } from 'potence';

function checkType<T extends TypeofResult>(object: unknown, type: T): object is Typeof<T> {
    return typeof object === type;
}

let object: unknown = 'foo';

if (checkType(object, 'string')) {
    // In this block, TypeScript knows that object is of type string

    object = object.toLowerCase();   // no error
}
```

## Remarks

See [`TypeofResult`]({{ site.baseurl }}{% link _pages/Types/TypeofResult.md %}).
