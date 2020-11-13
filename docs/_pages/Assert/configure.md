---
layout:      page
title:       Assert.configure()
module:      Assert
order:       -2
description: Allows you to configure various behavior in regards to the
             assertion messages.
parameters:
  configuration: A configuration object defining any of the below properties.
  configuration.prefixed:
    description: |
      If `true`, all assertion error messages are prefixed with
      "`Assertion failed`".

      Default is `true`.
    optional: yes
  configuration.stringifyOptions:
    description: |
      All non-generic assertion functions (i.e. functions where the condition to
      test is defined by the function, not by callers) use §Objects.stringify()§
      to convert the values they test into strings if they fail. You can specify
      this argument to change the behavior of `Objects.stringify()` in those
      cases.

      The default configuration is `{ truncateContents: true }`.
    optional: yes
---
## Syntax

```ts
interface AssertConfiguration {
    prefixed?: boolean;
    stringifyOptions?: StringifyOptions;
}

function configure(configuration: AssertConfiguration): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

Assert.configure({
    prefixed: false,
    stringifyOptions: {
        truncateContents: true
    }
});
```
