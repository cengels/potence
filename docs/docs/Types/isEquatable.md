---
layout:      page
title:       isEquatable()
module:      Types
description: Type guard that checks whether a value is an `Equatable`.
parameters:
  object: An object whose type isn't known.
---
## Syntax

```ts
function isEquatable(object: unknown): object is Equatable
```

<p class="description">{{ page.description | markdownify }}</p>
{% include parameters.html parameters=page.parameters %}

## Example

```ts
import { isEquatable } from 'potence';

const object = {
    value: 2,
    equals: function(other) { return this.value === other.value; }
};

const object2 = {
    value: 2
};

if (isEquatable(object)) {
    object.equals(object2);   // -> true
}
```

## Remarks

See [`Equatable`]({% link docs/Types/Equatable.md %}).
