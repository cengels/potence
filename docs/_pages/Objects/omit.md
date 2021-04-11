---
layout:      page
title:       Objects.omit()
module:      Objects
added:       0.5.0
description: Creates a new object from an existing one with a set of keys
             excluded.
parameters:
  object: The object to omit keys from.
  which:
    description: The keys to exclude from the new object.
    rest: yes
---
## Syntax

```ts
function omit<T extends object, Keys extends keyof T>(object: T, ...which: Keys[]): Omit<T, Keys>
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

Objects.omit(colors, 'blue', 'cyan');
// returns:
// {
//     red: 0xff0000,
//     yellow: 0xffff00,
//     green: 0x00ff00,
//     purple: 0xff00ff
// }
```

## Remarks

This function is analogous to TypeScript's
[`Omit<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys).

This function uses 
[`Objects.filter()`]({{ site.baseurl }}{% link _pages/Objects/filter.md %})
internally. If you wish to filter by value, you may want to use
`Objects.filter()` directly.

See also
[`Objects.pick()`]({{ site.baseurl }}{% link _pages/Objects/pick.md %}).
