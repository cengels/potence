---
layout:      page
title:       Flags.hasSome()
module:      Flags
added:       0.5.0
description: Checks if the number includes some of the given flags.
parameters:
  flags: The flags number on which to check for the presence of the flags.
         This parameter only exists on the static method.
  someFlags:
    description: The flag to check for.
    rest: yes
---
## Syntax

```ts
function hasSome(flags: number, ...someFlags: number[]): boolean
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
Flags.hasSome(flags, Options.IncludeHotDogs);              // -> true
Flags.hasSome(flags, Options.PreventGlobalDisaster);       // -> false
new Flags(flags).hasSome(Options.IncludeHotDogs);          // -> true
new Flags(flags).hasSome(Options.PreventGlobalDisaster);   // -> false
```

## Remarks

This function throws if any of the `someFlags` arguments are not valid flags.
All flags must be finite positive integers.
Unlike [`Flags.hasEvery()`]({{ site.baseurl }}{% link _pages/Flags/hasEvery.md %}),
this function does not throw on flags that are `0`.
