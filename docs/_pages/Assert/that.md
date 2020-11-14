---
layout:      page
title:       Assert.that()
module:      Assert
order:       -1
description: Asserts that an arbitrary condition is true by throwing an
             assertion error if it isn't.
parameters:
  condition: A condition that must evaluate to a boolean. If this condition
             is `false`, an assertion error is thrown.
  failureMessage:
    description: A failure message that will be thrown if the assertion fails.
                 If not supplied, the failure message will be
                 "`Assertion failed.`"
    optional: yes
---
## Syntax

```ts
function that(condition: boolean, failureMessage?: string): void
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Assert } from 'potence';

function removeSpaces(arg) {
    Assert.that(typeof arg === 'string', 'argument must be a string!');

    return arg.replace(' ', '');  // no error, arg is of type string
}

removeSpaces('fo  o');  // OK, returns 'foo'
removeSpaces(5);        // AssertionError: "Assertion failed: argument must be a string!"
```

## Remarks

This function is a
[TypeScript assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
meaning it behaves exactly the same as a condition in an `if` statement,
narrowing the type if possible. This makes this function an extremely powerful
tool to write one-liner assertion functions without having to use any type casts
when using the variable afterwards.

You should still prefer one of the other assertion functions if possible, as the
other functions typically have superior assertion error messages. For instance,
prefer [`Assert.notNull()`]({{ site.baseurl }}{% link _pages/Assert/notNull.md %}) over
`Assert.that(x != null)`.
