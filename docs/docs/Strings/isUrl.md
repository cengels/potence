---
layout:      page
title:       Strings.isUrl()
module:      Strings
description: Checks if a string is a valid URL.
parameters:
  url: The string to check.
---
## Syntax

```ts
function isUrl(url: string): boolean
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Strings } from 'potence';

Strings.isUrl('https://www.google.com');  // -> true
Strings.isUrl('http:google.com');         // -> false
```

## Remarks

URL testing, like e-mail address testing, is a notoriously complicated topic due
to the vast number of different valid URL variants available. If you discover a
valid URL string for which this function erroneously returns `false`, please
don't hesitate to [open a new issue on our public
github](https://github.com/cengels/potence/issues/new).
