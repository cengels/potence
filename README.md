# nitrous

A tiny modularized JavaScript library containing a variety of convenience functions related to common data types.

## Why would you use nitrous?

### nitrous is tiny and has no transitive dependencies.

These days JavaScript packages are huge, and it all tends to be because of external dependencies.
You think you're doing fine because you depend on only one package, but you don't realize that
that package depends on ten others, which also depend on ten others, and before you know it
you just increased your build size by 300 KB. nitrous has no dependencies at all; all functionality
comes from this package's source code itself.

### Open to contributions and improvements

You have a great idea for a function or module that should be part of this project? Don't hesitate to open an
issue! On the same note: you have an idea for how to improve the implementation of an existing
function, to make it more failsafe or faster? Again, don't hesitate to open an issue or directly
create a pull request!

*Note: nitrous is dedicated to a small package size, to allow you to embed it in almost any
project with minimal overhead. To maintain this paradigm, a function proposal must fulfill two
requirements: the function must be small in size (otherwise a separate package may be more
reasonable) and its use case must be common enough to be potentially frequently used by consumers.
Since the package is modularized, however, feel free to suggest new modules at will!*

## Usage

The way you import and use nitrous is up to you. The recommended way to use nitrous, however,
is to namespace your imports like this:

```js
    import * as Arrays from 'nitrous/arrays';

    Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```

Since nitrous offers utility functions for each major data type, this allows you to immediately
identify which data type a set of functions belongs to and get code suggestions only for that
type. It also prevents name clashes between modules.

Alternatively, you can simply import from the main module entry. This will also allow you to capitalize
on your IDE's or code editor's import completion. However, you won't be able to use non-namespaced modules this way:

```js
    import { Arrays } from 'nitrous';

    Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```
