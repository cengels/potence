# Changelog

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
