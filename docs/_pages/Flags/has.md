---
layout:      page
title:       Flags.has()
module:      Flags
added:       0.5.0
description: Checks if the number includes the given flag.
parameters:
  flags: The flags number on which to check for the presence of a flag.
         This parameter only exists on the static method.
  flag: The flag to check for.
---
## Syntax

```ts
function has(flags: number, flag: number): boolean
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
Flags.has(flags, Options.IncludeHotDogs);      // -> true
new Flags(flags).has(Options.IncludeHotDogs);  // -> true
```

## Remarks

This function throws if the `flag` argument is not a valid flag.
The flag must be a non-zero finite positive integers.
