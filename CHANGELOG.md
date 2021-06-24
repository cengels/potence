# Changelog

All items marked as "**changed**", "**removed**", or "**renamed**" are likely to
be breaking changes. Before 1.0.0, these changes will **not be announced** and
will only be documented in this file, so please make sure to read it thoroughly
if you wish to upgrade.

## [0.5.0](https://github.com/cengels/potence/compare/0.4.0...0.5.0) - unreleased

### Arrays

- **Added**: new class
  [`List<T>`](https://cengels.github.io/potence/Arrays/List)
  that encapsulates all relevant functions in the
  [`Arrays`](https://cengels.github.io/potence/Arrays)
  module
- **Added**: new function
  [`Arrays.count()`](https://cengels.github.io/potence/Arrays/count)
- **Added**: new function
  [`Arrays.hasElementAt()`](https://cengels.github.io/potence/Arrays/hasElementAt)
- **Added**: new function
  [`Arrays.correlate()`](https://cengels.github.io/potence/Arrays/correlate)
- **Added**: new function
  [`Arrays.range()`](https://cengels.github.io/potence/Arrays/range)
- **Added**: new function
  [`Arrays.findIndices()`](https://cengels.github.io/potence/Arrays/findIndices)
- **Added**: new function
  [`Arrays.hasMultiple()`](https://cengels.github.io/potence/Arrays/hasMultiple)
- **Added**: new function
  [`Arrays.difference()`](https://cengels.github.io/potence/Arrays/difference)
- **Added**: new function
  [`Arrays.intersection()`](https://cengels.github.io/potence/Arrays/intersection)
- **Added**: new function
  [`Arrays.union()`](https://cengels.github.io/potence/Arrays/union)
- **Renamed**: `Arrays.inBounds()` to
  [`Arrays.isInBounds()`](https://cengels.github.io/potence/Arrays/isInBounds)
- **Renamed**: `Arrays.empty()` to
  [`Arrays.isEmpty()`](https://cengels.github.io/potence/Arrays/isEmpty)
- **Renamed**: `Arrays.notEmpty()` to
  [`Arrays.isNotEmpty()`](https://cengels.github.io/potence/Arrays/isNotEmpty)
- **Changed**: changed most generics to refer to the array itself, not the
  elements within, to allow the functions to return the same type that was
  passed in (in the case of subtyped arrays)
- **Changed**: use of
  [`Arrays.isInBounds()`](https://cengels.github.io/potence/Arrays/isInBounds)
  is now discouraged in favour of
  [`Arrays.hasElementAt()`](https://cengels.github.io/potence/Arrays/hasElementAt)
- **Changed**: [`Arrays.first()`](https://cengels.github.io/potence/Arrays/first),
  [`Arrays.last()`](https://cengels.github.io/potence/Arrays/last),
  [`Arrays.isEmpty()`](https://cengels.github.io/potence/Arrays/isEmpty),
  [`Arrays.isNotEmpty()`](https://cengels.github.io/potence/Arrays/isNotEmpty),
  [`Arrays.distinct()`](https://cengels.github.io/potence/Arrays/distinct), and
  [`Arrays.hasDuplicates()`](https://cengels.github.io/potence/Arrays/hasDuplicates)
  now accept a generic `Iterable<T>` instead of just arrays

### Assert

- **Added**: new function
  [`Assert.equals()`](https://cengels.github.io/potence/Assert/equals)
- **Added**: new function
  [`Assert.notEquals()`](https://cengels.github.io/potence/Assert/notEquals)
- **Added**: new function
  [`Assert.type()`](https://cengels.github.io/potence/Assert/type)
- **Added**: new function
  [`Assert.instanceOf()`](https://cengels.github.io/potence/Assert/instanceOf)
- **Added**: new function
  [`Assert.empty()`](https://cengels.github.io/potence/Assert/empty)
- **Added**: new function
  [`Assert.notEmpty()`](https://cengels.github.io/potence/Assert/notEmpty)
- **Changed**: allow
  [`Assert.every()`](https://cengels.github.io/potence/Assert/every)
  to return a `boolean` inside callback function

### Flags

- **Added**: new module

### Numbers

- **Added**: new function
  [`Numbers.roman()`](https://cengels.github.io/potence/Numbers/roman)
- **Added**: new function
  [`Numbers.closest()`](https://cengels.github.io/potence/Numbers/closest)
- **Added**: new function
  [`Numbers.exponent()`](https://cengels.github.io/potence/Numbers/exponent)
- **Added**: new function
  [`Numbers.from()`](https://cengels.github.io/potence/Numbers/from)
- **Renamed**: `Numbers.even()` to
  [`Numbers.isEven()`](https://cengels.github.io/potence/Numbers/isEven)
- **Renamed**: `Numbers.odd()` to
  [`Numbers.isOdd()`](https://cengels.github.io/potence/Numbers/isOdd)
- **Renamed**: `Range.between()` to
  [`Range.isBetween()`]([`Range`](https://cengels.github.io/potence/Numbers/Range))
- **Changed**: all
  [`Range`](https://cengels.github.io/potence/Numbers/Range)
  fields now use
  [private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- **Changed**: 
  [`Range.intersect()`](https://cengels.github.io/potence/Numbers/Range)
  now returns
  [`Number.NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)
  when no intersection was found

### [Range](https://cengels.github.io/potence/Numbers/Range)

- **Renamed**: `Range.intersect()` to `Range.intersectionPoint()`
- **Changed**: `Range.intersectionPoint` now returns
  [`Number.NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)
  if no intersection was found
- **Added**: new function `Range.intersect()`
- **Added**: new function `Range.union()`
- **Added**: new function `Range.getOffset()`
- **Added**: new function `Range.isEmpty()`

### Objects

- **Added**: new function
  [`Objects.map()`](https://cengels.github.io/potence/Objects/map)
- **Added**: new function
  [`Objects.filter()`](https://cengels.github.io/potence/Objects/filter)
- **Added**: new function
  [`Objects.omit()`](https://cengels.github.io/potence/Objects/omit)
- **Added**: new function
  [`Objects.pick()`](https://cengels.github.io/potence/Objects/pick)
- **Added**: new function
  [`Objects.is()`](https://cengels.github.io/potence/Objects/is)
- **Added**: new function
  [`Objects.getPropertyDescriptor()`](https://cengels.github.io/potence/Objects/getPropertyDescriptor)
- **Added**: new function
  [`Objects.isWritable()`](https://cengels.github.io/potence/Objects/isWritable)
- **Added**: new function
  [`Objects.getConstructor()`](https://cengels.github.io/potence/Objects/getConstructor)
- **Added**: new function
  [`Objects.clone()`](https://cengels.github.io/potence/Objects/clone)

### Strings

- **Added**: new function
  [`Strings.isEmpty()`](https://cengels.github.io/potence/Strings/isEmpty)
- **Added**: new function
  [`Strings.isWhitespace()`](https://cengels.github.io/potence/Strings/isWhitespace)
- **Added**: new function
  [`Strings.forEach()`](https://cengels.github.io/potence/Strings/forEach)
- **Added**: new function
  [`Strings.chars()`](https://cengels.github.io/potence/Strings/chars)
- **Added**: new function
  [`Strings.codePoints()`](https://cengels.github.io/potence/Strings/codePoints)
- **Added**: new function
  [`Strings.splitAt()`](https://cengels.github.io/potence/Strings/splitAt)
- **Added**: new function
  [`Strings.stripStart()`](https://cengels.github.io/potence/Strings/stripStart)
- **Added**: new function
  [`Strings.stripEnd()`](https://cengels.github.io/potence/Strings/stripEnd)
- **Added**: new function
  [`Strings.stripBefore()`](https://cengels.github.io/potence/Strings/stripBefore)
- **Added**: new function
  [`Strings.stripAfter()`](https://cengels.github.io/potence/Strings/stripAfter)
- **Added**: new function
  [`Strings.pascalCase()`](https://cengels.github.io/potence/Strings/pascalCase)
- **Changed**: [`Strings.strip()`](https://cengels.github.io/potence/Strings/strip)
  no longer strips all spaces by default (now just returns original string)

### Types

- **Added**: new type
  [`Callback<T, U>`](https://cengels.github.io/potence/Types/Callback)
- **Added**: new type
  [`Predicate<T>`](https://cengels.github.io/potence/Types/Predicate)
- **Added**: new type
  [`HexChar`](https://cengels.github.io/potence/Types/HexChar)
- **Added**: new type
  [`ExcludeProps`](https://cengels.github.io/potence/Types/ExcludeProps)

### Other

- **Changed**: updated online documentation across the board
- **Changed**: updated JsDocs across the board

## [0.4.0](https://github.com/cengels/potence/compare/0.3.0...0.4.0) - 2020-11-13

### Assert

- **Removed**: `Assert.some()` as its usefulness was limited (you could just do
  `Assert.that(array.some(predicate))` instead)
- **Changed**: all assertion functions (except
  [`Assert.every()`](https://cengels.github.io/potence/Assert/every)) now return
  `void` and are [TypeScript assertion
  functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
- **Changed**: all assertion functions except
  [`Assert.that()`](https://cengels.github.io/potence/Assert/that) now no longer
  accept a second argument to change the failure message; instead this argument
  now specifies the name of the variable or property of the value that is being
  checked
- **Changed**:
  [`Assert.every()`](https://cengels.github.io/potence/Assert/every) no longer
  accepts a predicate as its second argument; instead it is now a callback
  function returning void that should throw an assertion error if the element
  does not pass the assertion
- **Added**: new configuration property `stringifyOptions` (see
  [`Objects.stringify()`](https://cengels.github.io/potence/Objects/stringify))

### Arrays

- **Added**: new function
  [`Arrays.distinct()`](https://cengels.github.io/potence/Arrays/distinct)
- **Added**: new function
  [`Arrays.hasDuplicates()`](https://cengels.github.io/potence/Arrays/hasDuplicates)
- **Fixed**:
  [`Arrays.removeAt()`](https://cengels.github.io/potence/Arrays/removeAt)
  previously didn't check if the index was in-bounds; now it throws an error if
  the index is out of bounds
- **Fixed**:
  [`Arrays.replace()`](https://cengels.github.io/potence/Arrays/replace) using
  wrong function name in its error text
- **Fixed**: [`Arrays.zip()`](https://cengels.github.io/potence/Arrays/zip) and
  [`Arrays.groupBy()`](https://cengels.github.io/potence/Arrays/groupBy) not
  allowing readonly arrays to be passed
- **Fixed**: improved
  [`Arrays.clearNull()`](https://cengels.github.io/potence/Arrays/clearNull)
  performance

### Numbers

- **Removed**: all function aliases, including `Arrays.approaches()`,
  `Arrays.closeTo()`, `Arrays.average()`, and `Arrays.avg()` (see
  [edff19f2](https://github.com/cengels/potence/commit/edff19f281b44cebb60dd7302462e0cb3b2ebbec)
  for the reasoning behind this change)
- **Removed**: `Numbers.center()` in favor of
  [`Range.center()`](https://cengels.github.io/potence/Numbers/Range)
- **Removed**: `Numbers.integral()` in favor of
  [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
- **Renamed**: `Numbers.float()` to
  [`Numbers.isFloat()`](https://cengels.github.io/potence/Numbers/isFloat) to
  better communicate its intent
- **Renamed**: `Numbers.safeFloat()` to
  [`Numbers.isSafeFloat()`](https://cengels.github.io/potence/Numbers/isSafeFloat)
  to better communicate its intent
- **Renamed**: `Numbers.unsafeFloat()` to
  [`Numbers.isUnsafeFloat()`](https://cengels.github.io/potence/Numbers/isUnsafeFloat)
  to better communicate its intent
- **Fixed**:
  [`Numbers.isFloat()`](https://cengels.github.io/potence/Numbers/isFloat) did
  not handle `NaN`, `Infinity` and `-Infinity` correctly

### Objects

- **Renamed**: `Objects.equals()` to
  [`Objects.equal()`](https://cengels.github.io/potence/Objects/equal) as it
  sounds better grammatically
- **Changed**: hid some previously exposed internal types like
  `MappedStructure<T>`
- **Changed**:
  [`Objects.structure()`](https://cengels.github.io/potence/Objects/structure)
  is now by default a non-exhaustive check (meaning the object may have more
  properties than the structure declares)
- **Changed**:
  [`Objects.equal()`](https://cengels.github.io/potence/Objects/equal) now
  performs a simple equality check if object does not implement `Equatable`
  (previously performed a shallow comparison)
- **Changed**:
  [`Objects.hasProperty()`](https://cengels.github.io/potence/Objects/hasProperty)
  and
  [`Objects.hasFunction()`](https://cengels.github.io/potence/Objects/hasFunction)
  are now type guards
- **Changed**:
  [`Objects.hasProperty()`](https://cengels.github.io/potence/Objects/hasProperty)
  and
  [`Objects.hasFunction()`](https://cengels.github.io/potence/Objects/hasFunction)
  can now be called on primitive types too (previously always returned `false`)
- **Added**: new function
  [`Objects.stringify()`](https://cengels.github.io/potence/Objects/stringify)
- **Added**: second parameter to
  [`Objects.structure()`](https://cengels.github.io/potence/Objects/structure)
  that may be passed to make the check exhaustive

### Strings

- **Added**: new function
  [`Strings.capitalize()`](https://cengels.github.io/potence/Strings/capitalize)
- **Added**: new function
  [`Strings.uncapitalize()`](https://cengels.github.io/potence/Strings/uncapitalize)

### Types

- **Added**: new type alias
  [`Truthy<T>`](https://cengels.github.io/potence/Types/Truthy)
- **Added**: new type alias
  [`Falsy<T>`](https://cengels.github.io/potence/Types/Falsy)
- **Added**: new interface
  [`Iterable`](https://cengels.github.io/potence/Types/Iterable) and
  corresponding type guard
  [`isIterable()`](https://cengels.github.io/potence/Types/isIterable)
- **Fixed**:
  [`Instantiable`](https://cengels.github.io/potence/Types/Instantiable):
  leaving the second type parameter as its default now allows you specify any
  number of constructor arguments of any type (previously allowed no arguments)

### Other

- **Added**: online documentation for all modules, functions, and types
- **Changed**: updated JsDocs across the board
- **Fixed**: [`Range`](https://cengels.github.io/potence/Numbers/Range) is now
  properly re-exported from the main module entry
- **Changed**: Added `ReadonlyRange` as export from main module entry

## [0.3.0](https://github.com/cengels/potence/compare/0.2.0...0.3.0) - 2020-11-05

### Assert

- **Changed**: the assertion functions
  [`truthy()`](https://cengels.github.io/potence/Assert/truthy),
  [`falsy()`](https://cengels.github.io/potence/Assert/falsy),
  [`notNull()`](https://cengels.github.io/potence/Assert/notNull),
  [`every()`](https://cengels.github.io/potence/Assert/every), and `some()` now
  return the value that was passed in to allow for more fluent usage syntax

### Numbers

- **Added**: new function
  [`Range.wrap(value)`](https://cengels.github.io/potence/Numbers/Range)

### Objects

- **Changed**: the [`Objects`](https://cengels.github.io/potence/Objects/index)
  functions
  [`structure()`](https://cengels.github.io/potence/Objects/structure),
  [`swap()`](https://cengels.github.io/potence/Objects/swap), and
  [`equatable()`](https://cengels.github.io/potence/Objects/equatable) now only
  expect an `object` as their first argument (previously expected an object with
  an index signature)
- **Changed**:
  [`Objects.structure()`](https://cengels.github.io/potence/Objects/structure)
  now accepts any object (previously threw an error if the object was not an
  object literal)
- **Changed**:
  [`Objects.equatable()`](https://cengels.github.io/potence/Objects/equatable)
  now throws an error if target object contains a non-function "equals" property

### Types

- **Changed**: the helper type
  [`ObjectLiteral<T>`](https://cengels.github.io/potence/Types/ObjectLiteral)
  now stands for `Record<string | number | symbol, T>` (from `Record<string,
  T>`)

### Other

- **Changed**: updated several JsDoc texts to be more descriptive

## [0.2.0](https://github.com/cengels/potence/compare/0.1.1...0.2.0) - 2020-09-13

### Arrays

- **Added**: new function [`Arrays.removeAt(array, index)`](https://cengels.github.io/potence/Arrays/removeAt)
- **Added**: new overload [`Arrays.sort(array, ...sortFunctions)`](https://cengels.github.io/potence/Arrays/sort)
- **Added**: new function [`Arrays.moveAll(array, by)`](https://cengels.github.io/potence/Arrays/moveAll)
- **Added**: new function [`Arrays.zip(array, ...otherArrays)`](https://cengels.github.io/potence/Arrays/zip)
- **Added**: new function [`Arrays.groupBy(array, (item) => property)`](https://cengels.github.io/potence/Arrays/groupBy)

### Objects

- **Added**: new function [`Objects.swap(object, from, to)`](https://cengels.github.io/potence/Objects/swap)
- **Added**: new function [`Objects.equals(object, ...otherObjects)`](https://cengels.github.io/potence/Objects/equal)
- **Added**: new function [`Objects.equatable(object)`](https://cengels.github.io/potence/Objects/equatable)
- **Added**: new function [`Objects.hasProperty(object, propertyName, propertyType)`](https://cengels.github.io/potence/Objects/hasProperty)
- **Added**: new function [`Objects.hasFunction(object, functionName, argumentCount)`](https://cengels.github.io/potence/Objects/hasFunction)

### Strings

- **Added**: new function [`Strings.camelCase(string)`](https://cengels.github.io/potence/Strings/camelCase)
- **Added**: new function [`Strings.prefix(string, prefix)`](https://cengels.github.io/potence/Strings/prefix)
- **Added**: new function [`Strings.suffix(string, suffix)`](https://cengels.github.io/potence/Strings/suffix)
- **Added**: new function [`Strings.isUrl(string)`](https://cengels.github.io/potence/Strings/isUrl)

### Types

- **Added**: new type [`ArrayType<T>`](https://cengels.github.io/potence/Types/ArrayType)
- **Added**: new type [`Equatable`](https://cengels.github.io/potence/Types/Equatable)
- **Added**: new function [`isPrimitive(target)`](https://cengels.github.io/potence/Types/isPrimitive)
- **Added**: new function [`isEquatable(target)`](https://cengels.github.io/potence/Types/isEquatable)

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
