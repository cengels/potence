---
layout: home
---

# potence

*potence* is a tiny modularized JavaScript library containing a variety of convenience functions related
to common data types like strings, numbers, objects, or arrays. Unfortunately, JavaScript lacks a comprehensive
standard library, which is why implementing seemingly basic functionality can sometimes be quite a hassle.
You often find yourself writing the same utility functions over and over in different projects.

*potence* takes that job out of your hands and provides you with all the functions that you'd expect any
mature language to have intrinsically and more.

## Table of contents

* [Why would you use *potence*?](#why-would-you-use-potence)
  * [*potence* is tiny and has no dependencies](#potence-is-tiny-and-has-no-dependencies)
  * [Open to contributions and improvements](#open-to-contributions-and-improvements)
  * [Full TypeScript integration](#full-typescript-integration)
* [Usage](#usage)
  * [Installation](#installation)
  * [Submodule imports](#submodule-imports)
  * [Main entry imports](#main-entry-imports)
* [Contribution Guidelines](#contribution-guidelines)

## Why would you use *potence*?

### *potence* is tiny and has no dependencies

All functionality in *potence* is completely implemented in native JavaScript. While *potence*
does sport quite a few functions, its modular nature allows for tree-shaking, so **you only
pay for what you actually use**, drastically reducing overall bundle size.

### Full test coverage

All available functions are supported by unit tests. Even the utility types offered to TypeScript
users have full test coverage thanks to [`ts-morph`](https://github.com/dsherret/ts-morph).

### Open to contributions and improvements

The modularity of modern JavaScript build systems allows us to add an infinite number of
new functions and modules without impacting the final bundle size at all. As such, *potence*
constantly strives to add more common functionality and eliminate potential bugs. For this
it relies on user feedback, so don't be afraid to open an issue on github if you notice a bug
or have an idea for an improvement! Be sure to read the contribution guidelines below if you
have a feature request.

### Full TypeScript integration

*potence* is built entirely on TypeScript. You don't *have* to use TypeScript to use *potence*, of course,
but if you do you'll be able to benefit from full type coverage. *potence* even offers some utility
types to represent things like abstract constructors, instantiable constructors, or object literals.

## Usage

### Installation

Simply run

```bash
npm install potence
```

or

```bash
yarn install potence
```

### Submodule imports

The way you import and use *potence* is up to you. You can use submodule
imports:

```ts
import * as Arrays from 'potence/arrays';

Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```

Since potence offers utility functions for each major data type, this allows you
to immediately identify which data type a set of functions belongs to and get
code suggestions only for that type. It also prevents name clashes between
modules.

### Main entry imports

Alternatively, you can simply import from the main module entry. This will also
allow you to capitalize on your IDE's or code editor's import completion.
However, you won't be able to use non-namespaced modules this way:

```ts
import { Arrays } from 'potence';

Arrays.equal([1, 2, 3], [1, 2, 3]); // true
```

**Note for webpack users**: It is strongly recommended that you
[migrate to webpack 5](https://webpack.js.org/migrate/5/)
if you'd like to use main module imports. This is because webpack 4
does not support tree-shaking for re-exported modules, which means
that, in this example, all `Arrays` functions would be added to your
bundle despite the fact you only use `Arrays.equal()`. webpack 5
only ever bundles the functions you actually use.

## Contribution Guidelines

To maintain *potence*'s original paradigms, there are a series of guidelines you
should read and keep if you'd like to contribute to the project:

* **Size.** Using any given *potence* function should not increase the resulting
  build size by a large margin. To ensure that it doesn't, functions must be
  kept as small as possible. If your idea does not fit a single function,
  consider creating a standalone package for it.
* **Generalization.** All functions must be kept as generalized as possible to
  ensure that a wide variety of projects can use them in their code base and to
  avoid bloating *potence*. A function tailored for a very specific use case may
  not be suitable for *potence*. When in doubt, open an issue and we can discuss
  the idea together.
* **Function number.** To ensure a good developing experience, there should a)
  not be too many modules and b) not be too many functions per module so as to
  not bloat the IDE's code completion lists and make it harder for the user to
  find the function they need.
* **Documentation.** Each module and function must be thoroughly documented. Any
  user should be able to understand what the function does without any prior
  knowledge aside from JavaScript basics. Include examples if the usage is
  unclear. *Only relevant on pull requests.*
* **Tests.** Functions without 100% line coverage will not be accepted. *Only
  relevant on pull requests.*
