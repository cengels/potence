---
layout:      page
title:       Flags.hasEvery()
module:      Flags
added:       0.5.0
description: Checks if the number includes all of the given flags.
parameters:
  flags: The flags number on which to check for the presence of the flags.
         This parameter only exists on the static method.
  everyFlag:
    description: The flag to check for.
    rest: yes
---
## Syntax

```ts
function hasEvery(flags: number, ...everyFlag: number[]): boolean
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

const flags = Options.IncludeHotDogs | Options.CleanUpAfter;
Flags.hasEvery(flags, Options.IncludeHotDogs, Options.CleanUpAfter);      // -> true
Flags.hasEvery(flags, Options.IncludeHotDogs);                            // -> false
new Flags(flags).hasEvery(Options.IncludeHotDogs, Options.CleanUpAfter);  // -> true
new Flags(flags).hasEvery(Options.IncludeHotDogs);                        // -> false
```

## Remarks

This function throws if any of the `everyFlag` arguments are not valid flags.
All flags must be non-zero finite positive integers.
