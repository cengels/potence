---
layout:      module
title:       Assert
description: |
  The Assert module provides a variety of assertion functions that test
  a condition or variable and throw an assertion error if the assertion
  fails.

  Where possible, the assertion functions use the
  [`asserts`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
  keyword so the TypeScript compiler can narrow the types after the
  assertion where applicable.

  Note that assertions are runtime checks, not compile-time checks. You should
  always prefer compile-time checks and only use assertions when you cannot
  use compile-time checks, for instance because your project is not using
  TypeScript or because a value in your code originates from an external API
  which does not use type-checking (such as a
  [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
  end point).

  By default, every assertion message is prefixed with "`Assertion failed`".
  You can disable this behavior as well as change the stringification
  rules for passed values using §Assert.configure()§.
---
