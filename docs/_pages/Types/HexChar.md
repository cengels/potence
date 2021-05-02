---
layout:      page
title:       HexChar
module:      Types
added:       0.5.0
description: Represents a single character in the hexadecimal
             range (0-9, A-F/a-f).
---
## Syntax

```ts
type HexChar
```

<div class="description">{% include linkify.html description=page.description %}</div>

## Example

```ts
import { HexChar } from 'potence';

function colorHasComponent(color: string, component: HexChar): boolean {
    return color.toLowerCase().includes(component.toLowerCase());
}

colorHasComponent('#ff0000', 'F');  // true
colorHasComponent('#ff0000', '5');  // false
colorHasComponent('#ff0000', 'Z');  // error: 'Z' is not assignable to type 'HexChar'
```

## Remarks

Though TypeScript supports
[template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
since
[TypeScript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html),
they can only represent simple expressions due to the fact that they essentially
populate a list containing all possible string combinatoins. In the case of a
type like

```ts
type HexColor = `${HexChar}${HexChar}${HexChar}${HexChar}${HexChar}${HexChar}`
```

TypeScript will
[throw an error](https://github.com/microsoft/TypeScript/issues/43388)
because the number of combinations is too large for TypeScript to safely handle.

As a result, until either
[lazily evaluated template literals](https://github.com/microsoft/TypeScript/issues/43335)
or
[RegEx-validated string types](https://github.com/microsoft/TypeScript/issues/41160)
are implemented, the usefulness of this type is rather limited.
