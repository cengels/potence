---
layout:      page
title:       Objects.filter()
module:      Objects
added:       0.5.0
description: Creates a new object from an existing one with only the keys and
             values that match a condition.
parameters:
  object: The object to filter.
  predicate: A predicate function that is called once for each enumerable key
             in the object and receives the value behind the key and the key
             itself as arguments. If this function returns `true`, the key
             and value are transferred to the new object.
---
## Syntax

```ts
function filter<T extends object>(object: T, predicate: (value: T[typeof key], key: keyof T) => boolean): Partial<T>
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

const colors = {
    red: 0xff0000,
    yellow: 0xffff00,
    green: 0x00ff00,
    blue: 0x0000ff,
    purple: 0xff00ff,
    cyan: 0x00ffff
};

// bitwise and
Objects.filter(colors, color => (color & colors.blue) === colors.blue);
// returns:
// {
//     blue: 0x0000ff,
//     purple: 0xff00ff,
//     cyan: 0x00ffff
// }
```

## Remarks

This function is analogous to
[`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

Note that this function does not perform any kind of copy on the key values.
If the key values are references, you may wish to use
[`Objects.map()`]({{ site.baseurl }}{% link _pages/Objects/map.md %})
to clone them after the filter operation.
