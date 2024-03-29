---
layout:      page
title:       isEquatable()
module:      Types
added:       0.2.0
updated:     0.6.0
description: Type guard that checks whether a value is an §Equatable§.
parameters:
  object: An object whose type isn't known.
---
## Syntax

```ts
function isEquatable(object: unknown): object is Equatable
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

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

See [`Equatable`]({{ site.baseurl }}{% link _pages/Types/Equatable.md %}).
