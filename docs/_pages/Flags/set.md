---
layout:      page
title:       Flags.set()
module:      Flags
added:       0.5.0
description: Returns a new number with the given flags set on the number.
parameters:
  flags: The flags number which to augment with the other flags.
         This parameter only exists on the static method.
  flagsToSet:
    description: The flags to set on the number.
    rest: yes
---
## Syntax

```ts
function set(flags: number, ...flagsToSet: number[]): number
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Flags } from 'potence';

enum Options {
    None = 0,
    IncludeHotDogs = 1,
    CleanUpAfter = 2,
    PreventGlobalDisaster = 4,
    BlowUpTheWorld = 8
}

const flags = Options.IncludeHotDogs | Options.CleanUpAfter;  // -> 3
Flags.set(flags, Options.BlowUpTheWorld);                     // -> 11
new Flags(flags).set(Options.BlowUpTheWorld);                 // -> 11
```

## Remarks

This function throws if any of the `flagsToSet` arguments are not valid flags.
All flags must be non-zero finite positive integers.

If a flag is already set, this function does not change the number.
