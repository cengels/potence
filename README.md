<h1 align="center">potence</h1>

<p align="center">
<a href="https://codecov.io/gh/cengels/potence"><img src="https://img.shields.io/codecov/c/github/cengels/potence" alt="Code Coverage" /></a>
<a href="https://snyk.io/test/github/cengels/potence"><img src="https://img.shields.io/snyk/vulnerabilities/github/cengels/potence" alt="Snyk Vulnerabilities for GitHub Repo" /></a>
<a href="https://david-dm.org/cengels/potence"><img src="https://img.shields.io/david/cengels/potence" alt="Dependencies" /></a>
<a href="https://www.npmjs.com/package/potence"><img src="https://img.shields.io/npm/v/potence" alt="npm version" /></a>
<a href="https://choosealicense.com/licenses/mit/"><img src="https://img.shields.io/github/license/cengels/potence" alt="GitHub" /></a>
</p>

## Table of contents

* [What is *potence*?](#what-is-potence)
* [Why would you use *potence*?](#why-would-you-use-potence)
  * [*potence* is tiny and has no dependencies](#potence-is-tiny-and-has-no-dependencies)
  * [Open to contributions and improvements](#open-to-contributions-and-improvements)
  * [Full TypeScript integration](#full-typescript-integration)
* [Docs](#docs)
* [Usage](#usage)
  * [Installation](#installation)
  * [Submodule imports](#submodule-imports)
  * [Main entry imports](#main-entry-imports)
* [Contribution Guidelines](#contribution-guidelines)

## What is *potence*?

*potence* is a tiny modularized JavaScript library containing a variety of convenience functions related
to common data types like strings, numbers, objects, or arrays. Unfortunately, JavaScript lacks a comprehensive
standard library, which is why implementing seemingly basic functionality can sometimes be quite a hassle.
You often find yourself writing the same utility functions over and over in different projects.

*potence* takes that job out of your hands and provides you with all the functions that you'd expect any
mature language to have intrinsically and more.

## Why would you use *potence*?

### *potence* is tiny and has no dependencies

In the current NPM ecosystem, transitive dependencies are the bane of every web dev's existence.
You *think* your module depends on only one other module, but that module depends on ten other
modules that each depend on ten others and before you know it, your build size has increased
by a factor of ten.

*potence* has no dependencies at all. All functionality is completely implemented in native
JavaScript. Additionally, *potence* is designed to be integrated by common build tools
like webpack or rollup to minimize overall bundle size so that **only the functions you
actually use are included in your resulting bundle.** In other words: if you implemented the
necessary functionality yourself, the build would be the same size as if you used *potence* instead.

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

## Docs

Currently there are six modules contained in this library:

| Module | Description |
| --- | --- |
| Arrays | Array comparisons and common functions like <ul><li>`Arrays.next([8, 1, -5], 2) => 8`</li><li>`Arrays.last([3, 6]) => 6`</li><li>`Arrays.replace([3, 6], 6, 9) => [3, 9]`</li></ul> |
| Assert | Simple assertions with an optional configurable failure message. Examples: <ul><li>`Assert.notNull(variable)`</li><li>`Assert.that(number > 0, 'number was negative')`</li><li>`Assert.every(array, item => typeof item === 'string')`</li></ul> |
| Numbers | Offers accurate floating point comparisons, ranges, integer/float checks, and various mathematical complements to `Math`. Examples: <ul><li>`Numbers.compare(0, 0.00000001) => true`</li><li>`Numbers.range(0, 20).relative(5) => 0.25`</li><li>`Numbers.sum(2, 4, 8) => 14`</li></ul> |
| Objects | Object comparisons (deep and shallow) and testing an object based on a schema. <ul><li>`Objects.compare({ a: 1 }, { a: 1 }) => true`</li><li>`Objects.isObjectLiteral(new Date()) => false`</li><li>`Objects.structure({ a: 1 }, { a: 'number' }) => true`</li></ul> |
| Strings | Work-in-progress. For now it only has: <ul><li>`Strings.strip('banana bear', 'na', ' ') => 'babear'`</li></ul> |
| Types | Convenience types for TypeScript users. <ul><li>`Nullable<string> // string \| null \| undefined`</li><li>`Constructor<BaseClass> // denotes abstract constructor`</li><li>`Instantiable<BaseClass> // denotes "newable" constructor`</li></ul> |

The full documentation is work-in-progress. Currently the only way to read the documentation is to go through the
JsDoc comments in the source code or to rely on your IDE to show it to you. We're aiming to create a more accessible
website with all the documentation on it ASAP.

In the meantime, if you'd like more complete examples, I encourage you to take a look at the [unit tests](https://github.com/cengels/potence/tree/master/tests).

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

## Contribution Guidelines

To maintain *potence*'s original paradigms, there are a series of guidelines you should read and keep if you'd
like to contribute to the project:

* **Size.** Using any given *potence* function should not increase the resulting build size by a large margin. To ensure that it doesn't,
  functions must be kept as small as possible. If your idea does not fit a single function, consider creating a standalone package for it.
* **Generalization.** All functions must be kept as generalized as possible to ensure that a wide variety of projects can use them in their
  code base and to avoid bloating *potence*. A function tailored for a very specific use case may not be suitable for *potence*. When in
  doubt, open an issue and we can discuss the idea together.
* **Function number.** To ensure a good developing experience, there should a) not be too many modules and b) not be too many functions
  per module so as to not bloat the IDE's code completion lists and make it harder for the user to find the function they need.
* **Documentation.** Each module and function must be thoroughly documented. Any user should be able to understand what the function does
  without any prior knowledge aside from JavaScript basics. Include examples if the usage is unclear. *Only relevant on pull requests.*
* **Tests.** Functions without 100% line coverage will not be accepted. *Only relevant on pull requests.*
