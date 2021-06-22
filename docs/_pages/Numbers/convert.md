---
layout:      page
title:       Numbers.convert()
module:      Numbers
added:       0.5.0
description: Converts a number from one unit to another.
             See below for a list of possible units.
parameters:
  source: An arbitrary number.
  from: The unit that `source` is in.
  to: The unit to convert `source` into.
---
## Syntax

```ts
function convert(source: number, from: Unit, to: Unit): number;
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example

```ts
import { Numbers } from 'potence';

// You can either use literal strings...
Numbers.convert(5, 'km', 'm');  // -> 5000

// ...or the enum-like constants provided by the convert module:
Numbers.convert(5, Unit.Length.Metric.Kilometer, Unit.Length.Metric.Meter);
// -> 5000
```

## Remarks

Different systems of equatable units can be converted to one another.
For instance, you can freely convert kilometers to miles.
However, you cannot convert to an incompatible unit. For instance,
attempting to convert meters to liters will result in an error.

## Units

`Unit` is both a type and a namespace containing the string constants
of all currently available units. You can either use those namespaced
constants or just use the string unit shorthands directly. Below is a
list of all currently available units:

### Distance

|    Unit      | shorthand | constant                        |
|--------------|-----------|---------------------------------|
| Kilometers   |  `'km'`   | `Unit.Length.Metric.Kilometer`  |
| Meters       |  `'m'`    | `Unit.Length.Metric.Meter`      |
| Decimeters   |  `'dm'`   | `Unit.Length.Metric.Decimeter`  |
| Centimeters  |  `'cm'`   | `Unit.Length.Metric.Centimeter` |
| Millimeters  |  `'mm'`   | `Unit.Length.Metric.Millimeter` |
| Micrometers  |  `'μm'`   | `Unit.Length.Metric.Micrometer` |
| Nanometers   |  `'nm'`   | `Unit.Length.Metric.Nanometer`  |
| Miles        |  `'mi'`   | `Unit.Length.Imperial.Mile`     |
| Yards        |  `'yd'`   | `Unit.Length.Imperial.Yard`     |
| Foots        |  `'ft'`   | `Unit.Length.Imperial.Foot`     |
| Inchs        |  `'in'`   | `Unit.Length.Imperial.Inch`     |
