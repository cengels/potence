# Changelog

All items marked as "**changed**", "**removed**", or "**renamed**" are likely to
be breaking changes. Before 1.0.0, these changes will **not be announced** and
will only be documented in this file, so please make sure to read it thoroughly
if you wish to upgrade.

## [0.4.0](https://github.com/cengels/potence/compare/0.3.0...0.4.0) - 2020-11-13

### Assert

- **Removed**: `Assert.some()` as its usefulness was limited (you could just do
  `Assert.that(array.some(predicate))` instead)
- **Changed**: all assertion functions (except `Assert.every()`) now return
  `void` and are
  [TypeScript assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
- **Changed**: all assertion functions except `Assert.that()` now no longer
  accept a second argument to change the failure message; instead this argument
  now specifies the name of the variable or property of the value that is being
  checked
- **Changed**: `Assert.every()` no longer accepts a predicate as its second
  argument; instead it is now a callback function returning void that should
  throw an assertion error if the element does not pass the assertion
- **Added**: new configuration property `stringifyOptions` (see `Objects.stringify()`)

### Arrays

- **Added**: new function `Arrays.distinct()`
- **Added**: new function `Arrays.hasDuplicates()`
- **Fixed**: `Arrays.removeAt()` previously didn't check if the index was
  in-bounds; now it throws an error if the index is out of bounds
- **Fixed**: `Arrays.replace()` using wrong function name in its error text
- **Fixed**: `Arrays.zip()` and `Arrays.groupBy()` not allowing readonly arrays
  to be passed
- **Fixed**: improved `Arrays.clearNull()` performance

### Numbers

- **Removed**: all function aliases, including `Arrays.approaches()`,
  `Arrays.closeTo()`, `Arrays.average()`, and `Arrays.avg()` (see
  [edff19f2](https://github.com/cengels/potence/commit/edff19f281b44cebb60dd7302462e0cb3b2ebbec)
  for the reasoning behind this change)
- **Removed**: `Numbers.center()` in favor of `Range.center()`
- **Removed**: `Numbers.integral()` in favor of
  [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
- **Renamed**: `Numbers.float()` to `Numbers.isFloat()` to better communicate its
  intent
- **Renamed**: `Numbers.safeFloat()` to `Numbers.isSafeFloat()` to better
  communicate its intent
- **Renamed**: `Numbers.unsafeFloat()` to `Numbers.isUnsafeFloat()` to better
  communicate its intent
- **Fixed**: `Numbers.isFloat()` did not handle `NaN`, `Infinity` and `-Infinity` correctly

### Objects

- **Renamed**: `Objects.equals()` to `Objects.equal()` as it sounds better
  grammatically
- **Changed**: hid some previously exposed internal types like
  `MappedStructure<T>`
- **Changed**: `Objects.structure()` is now by default a non-exhaustive check
  (meaning the object may have more properties than the structure declares)
- **Changed**: `Objects.equal()` now performs a simple equality check if object
  does not implement `Equatable` (previously performed a shallow comparison)
- **Changed**: `Objects.hasProperty()` and `Objects.hasFunction()` are now type
  guards
- **Changed**: `Objects.hasProperty()` and `Objects.hasFunction()` can now be
  called on primitive types too (previously always returned `false`)
- **Added**: new function `Objects.stringify()`
- **Added**: second parameter to `Objects.structure()` that may be passed to
  make the check exhaustive

### Strings

- **Added**: new function `Strings.capitalize()`
- **Added**: new function `Strings.uncapitalize()`

### Types

- **Added**: new type alias `Truthy<T>`
- **Added**: new type alias `Falsy<T>`
- **Added**: new interface `Iterable` and corresponding type guard
  `isIterable()`
- **Fixed**: `Instantiable`: leaving the second type parameter as its default
  now allows you specify any number of constructor arguments of any type
  (previously allowed no arguments)

### Other

- **Added**: online documentation for all modules, functions, and types
- **Changed**: updated JsDocs across the board
- **Fixed**: `Range` is now properly re-exported from the main module entry
- **Changed**: Added `ReadonlyRange` as export from main module entry

## [0.3.0](https://github.com/cengels/potence/compare/0.2.0...0.3.0) - 2020-11-05

### Assert

- **Changed**: the assertion functions `truthy()`, `falsy()`, `notNull()`, `every()`, and `some()`
  now return the value that was passed in to allow for more fluent usage syntax

### Numbers

- **Added**: new function `Range.wrap(value)`

### Objects

- **Changed**: the `Objects` functions `structure()`, `swap()`, and `equatable()` now only expect an `object` as their
  first argument (previously expected an object with an index signature)
- **Changed**: `Objects.structure()` now accepts any object (previously threw an error if the object was not an object literal)
- **Changed**: `Objects.equatable()` now throws an error if target object contains a non-function "equals" property

### Types

- **Changed**: the helper type `ObjectLiteral<T>` now stands for `Record<string | number | symbol, T>` (from `Record<string, T>`)

### Other

- **Changed**: updated several JsDoc texts to be more descriptive

## [0.2.0](https://github.com/cengels/potence/compare/0.1.1...0.2.0) - 2020-09-13

### Arrays

- **Added**: new function `Arrays.removeAt(array, index)`
- **Added**: new overload `Arrays.sort(array, ...sortFunctions)`
- **Added**: new function `Arrays.moveAll(array, by)`
- **Added**: new function `Arrays.zip(array, ...otherArrays)`
- **Added**: new function `Arrays.groupBy(array, (item) => property)`

### Objects

- **Added**: new function `Objects.swap(object, from, to)`
- **Added**: new function `Objects.equals(object, ...otherObjects)`
- **Added**: new function `Objects.equatable(object)`
- **Added**: new function `Objects.hasProperty(object, propertyName, propertyType)`
- **Added**: new function `Objects.hasFunction(object, functionName, argumentCount)`

### Strings

- **Added**: new function `Strings.camelCase(string)`
- **Added**: new function `Strings.prefix(string, prefix)`
- **Added**: new function `Strings.suffix(string, suffix)`
- **Added**: new function `Strings.isUrl(string)`

### Types

- **Added**: new type `ArrayType<T>`
- **Added**: new type `Equatable`
- **Added**: new function `isPrimitive(target)`
- **Added**: new function `isEquatable(target)`

## [0.1.1](https://github.com/cengels/potence/compare/0.1.0...0.1.1) - 2020-09-13

- **Fixed**: "directory import '..." is not supported resolving ES modules" error when attempting to import from main module entry in node.js projects

## [0.1.0](https://github.com/cengels/potence/releases/tag/0.1.0) - 2020-09-13

- **Changed**: mark package as being of type "module" to enable ESM in node.js projects

## 0.0.4 - 2020-08-09

- **Fixed**: build errors by publishing project from build directory
- **Removed**: redundant .npmignore

## 0.0.3 - 2020-08-09

- **Fixed**: build errors

## 0.0.2 - 2020-08-09

- **Fixed**: missing .npmignore resulting in incorrect npm packaging

## 0.0.1 - 2020-08-09

- Initial release
