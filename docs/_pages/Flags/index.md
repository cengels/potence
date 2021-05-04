---
layout:      module
title:       Flags
order:       -99
added:       0.5.0
description: |
  The Flags class provides convenience functions that conduct bitwise operations
  on numbers. Its primary use is for flag-type enums, that is enums with
  integral values that are powers of two, allowing a variable to contain
  multiple flags at the same time through merging by bitwise OR.

  Since flag enums require usage of the rather uncommon bitwise arithmetic,
  it is easy to make mistakes when working with a flag value. The Flags
  class adds an abstraction layer on top of the bitwise arithmetic, greatly
  reducing the risk of mistakes.

  Note that all related functions are available both as instance members of
  Flags instances, as well as static members of the Flags type itself, allowing
  you to choose between using them with or without an instance.
  Since instance methods operate on an instance flag field, they will have one
  less parameter. Static mutator methods return a new flag number, whereas
  instance mutator methods will return their own instance to allow chaining.
---
