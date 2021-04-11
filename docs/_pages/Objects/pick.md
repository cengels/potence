---
layout:      page
title:       Objects.pick()
module:      Objects
added:       0.5.0
description: Creates a new object from an existing one with only a set of keys
             included.
parameters:
  object: The object to pick keys from.
  which:
    description: The keys to include in the new object.
    rest: yes
---
## Syntax

```ts
function pick<T extends object, Keys extends keyof T>(object: T, ...which: Keys[]): Pick<T, Keys>
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

Objects.pick(colors, 'blue', 'cyan');
// returns:
// {
//     blue: 0x0000ff,
//     cyan: 0x00ffff
// }
```

## Remarks

This function is analogous to TypeScript's
[`Pick<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys).

This function uses 
[`Objects.filter()`]({{ site.baseurl }}{% link _pages/Objects/filter.md %})
internally. If you wish to filter by value, you may want to use
`Objects.filter()` directly.

See also
[`Objects.omit()`]({{ site.baseurl }}{% link _pages/Objects/omit.md %}).
