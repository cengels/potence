---
layout:      page
title:       Objects.map()
module:      Objects
added:       0.5.0
description: Creates a new object from an existing one by mapping all keys
             with a transform function.
parameters:
  object: The object to map.
  callback: A callback function that is called once for each enumerable key
            in the object and receives the value behind the key and the key
            itself as arguments.
---
## Syntax

```ts
function map<T extends object, U>(object: T, callback: (value: T[typeof key], key: keyof T) => U): MappedType<T, U>
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


Objects.map(colors, color => color.toString(16).padStart(6, '0'));
// returns:
// {
//     red: 'ff0000',
//     yellow: 'ffff00',
//     green: '00ff00',
//     blue: '0000ff',
//     purple: 'ff00ff',
//     cyan: '00ffff'
// }
```

## Remarks

This function is analogous to
[`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

See also
[`Objects.filter()`]({{ site.baseurl }}{% link _pages/Objects/filter.md %}).
