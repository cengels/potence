---
layout:      page
title:       Flags.unset()
module:      Flags
added:       0.5.0
description: Returns a new number with the given flags removed from the number.
parameters:
  flags: The flags number on which to remove the other flags.
         This parameter only exists on the static method.
  flagsToSet:
    description: The flags to remove from the number.
    rest: yes
---
## Syntax

```ts
function unset(flags: number, ...flagsToUnset: number[]): number
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
Flags.unset(flags, Options.IncludeHotDogs);                   // -> 2
new Flags(flags).unset(Options.IncludeHotDogs);               // -> 2
```

## Remarks

This function throws if any of the `flagsToUnset` arguments are not valid flags.
All flags must be non-zero finite positive integers.

If a flag is not set, this function does not change the number.
