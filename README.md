# *potence*

A tiny modularized JavaScript library containing a variety of convenience functions related to common data types.

## Why would you use *potence*?

### *potence* is tiny and has no dependencies

In the current NPM ecosystem, transitive dependencies are the bane of every web dev's existence.
You *think* your module depends on only one other module, but that module depends on ten other
modules that each depend on ten others and before you know it, your build size has increased
by a factor of ten.

*potence* has no dependencies at all. All functionality is completely implemented in native
JavaScript.

### Open to contributions and improvements

You have a great idea for a function or module that should be part of this project? Don't hesitate to open an
issue! On the same note: you have an idea for how to improve the implementation of an existing
function, to make it more failsafe or faster? Again, don't hesitate to open an issue or directly
create a pull request!

*Note: *potence* is dedicated to a small package size, to allow you to embed it in almost any
project with minimal overhead. To maintain this paradigm, a function proposal must fulfill two
requirements: the function must be small in size (otherwise a separate package may be more
reasonable) and it must be generalized enough to be usable by many different kinds of projects.*

## Usage

### Submodule imports

The way you import and use *potence* is up to you. You can use submodule imports:

```js
    import * as Arrays from 'potence/arrays';

    Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```

Since potence offers utility functions for each major data type, this allows you to immediately
identify which data type a set of functions belongs to and get code suggestions only for that
type. It also prevents name clashes between modules.

### Main entry imports

Alternatively, you can simply import from the main module entry. This will also allow you to capitalize
on your IDE's or code editor's import completion. However, you won't be able to use non-namespaced modules this way:

```js
    import { Arrays } from 'potence';

    Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```

**Note for webpack users**: It is strongly recommended that you [migrate to webpack 5](https://webpack.js.org/migrate/5/) if you'd like to
use main module imports. This is because webpack 4 does not support tree-shaking for re-exported modules, which means
that, in this example, all `Arrays` functions would be added to your bundle despite the fact you only use `Arrays.equal()`.
webpack 5 only ever bundles the functions you actually use.
