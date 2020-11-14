---
layout:      page
title:       Objects.stringify()
module:      Objects
added:       0.4.0
description: Converts an arbitrary value to a string.
parameters:
  value: A value of any type. No value will throw an error. The resulting
    string depends on the type of value. By default, primitives are printed
    as-is, arrays are printed in square bracket notation, class instances
    call toString() if a manual override exists, and all other objects
    print in curly bracket notation.
  options:
    description: An object containing any of the below options. These
                 allow you to customize the stringifying behavior.
    optional: yes
  options.truncateContents:
    description: |
      Whether the contents of arrays and objects should be truncated and
      replaced with an ellipsis (`...`). You can also specify a number here
      to specify how many properties or array elements you want to show
      before the remaining ones are truncated.

      Default is `false`.
    optional: yes
  options.typesOnly:
    description: |
      If true, stringify will only print the types, not their values.
      For instance, the value `4` would be replaced by `number`
      and a date object by `Date`.

      This property overrides `useToString`.

      Default is `false`.
    optional: yes
  options.primitiveTypesOnly:
    description: |
      Like `typesOnly`, except that this property affects only primitives.
      Objects and arrays will be printed like normal.

      This property is overridden by `typesOnly`.

      Default is `false`.
    optional: yes
  options.hideClasses:
    description: |
      By default if a non-primitive (that is, an `Object`, `Array`, or
      `Function`) is an instance of a non-standard class, its class name is
      printed before the main expression. If this property is true, the
      class name will be omitted even when the type is non-standard.

      This property is overridden by `typesOnly`.

      Default is `false`.
    optional: yes
  options.useToString:
    description: |
      If true, this function uses a type's `toString()` function if and only
      if it has a custom implementation, i.e. it does not return the standard
      "`[object Type]`".

      This property is overridden by `typesOnly`.

      Default is `true`.
    optional: yes
  options.omitQuotes:
    description: |
      By default, this function adds double quotes to either side of natural
      strings. This property removes those quotes.

      Default is `false`.
    optional: yes
  options.replacer:
    description: |
      If specified, this callback will be called for every value that is to be
      converted to string (i.e. the main value, all properties,
      and all array elements).

      If the function returns a string, that string is used instead of the
      default string conversion of `stringify()` for that value. If this
      function returns `null`, the default string conversion is used instead.
      This allows you to supply your own string converters selectively for
      certain types.
    optional: yes
---
## Syntax

```ts
export interface StringifyOptions {
    truncateContents?: boolean | number;
    typesOnly?: boolean;
    primitiveTypesOnly?: boolean;
    hideClasses?: boolean;
    useToString?: boolean;
    omitQuotes?: boolean;
    replacer?: (value: unknown) => string | null;
}

function stringify(value: unknown, options?: StringifyOptions): string
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Objects } from 'potence';

class CustomClass {
    prop = 5
}

Objects.stringify('hello');                        // -> "hello"
Objects.stringify('hello', { omitQuotes: true });  // -> hello
Objects.stringify('hello', { typesOnly: true });   // -> string
Objects.stringify([1, 2, 3]);                      // -> [1, 2, 3]
Objects.stringify({ prop: 'hello' });              // -> { prop: "hello" }
Objects.stringify(new CustomClass());              // -> CustomClass { prop: 5 }
Objects.stringify(() => 5);                        // -> () => 5

Objects.stringify([1, 2, 3], { truncateContents: true });
// -> [...]
Objects.stringify({ prop: '5' }, { truncateContents: true });
// -> { ... }
Objects.stringify([1, 2, 3], { truncateContents: 2 });
// -> [1, 2, ...]
Objects.stringify([1, 2, 3], { typesOnly: true });
// -> Array
Objects.stringify([1, 2, 3], { primitiveTypesOnly: true });
// -> [number, number, number]
Objects.stringify(new CustomClass(), { hideClasses: true });
// -> { prop: 5 }

// Multi-line functions are always truncated:
Objects.stringify(() => {
    return 5;
});
// -> () => { ... }

function replacer(item: unknown): string {
    if (typeof item === 'number') {
        return item.toString(2);
    }

    return null;
}

Objects.stringify([1, 2, 3, 'no-change'], { replacer });
// -> [1, 10, 11, "no-change"]
```

## Remarks

This function differs from
[`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
in that the strings generated by this function are not guaranteed to be valid
JSON. Instead of stripping out all types, this function attempts to keep
its output as close to the original data type as possible. For instance, this
function returns a valid string representation of functions (whereas
`JSON.stringify()` strips functions out completely) and prints the class name
of custom classes where appropriate.

While you should always strive to create your own overrides of `toString()` for
stringifications that are shown to the end user in some way, this function can
be very useful for debug outputs. For instance, the `assert` module heavily
utilizes this function to generate expressive failure messages.

All strings returned by this function are single-line.
