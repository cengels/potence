---
layout:      page
title:       Arrays.groupBy()
module:      Arrays
description: Creates a two-dimensional array by grouping the values in the
             original array by the return value of the property callback.
parameters:
  array: An array with any number of elements.
  property: A callback accepting one parameter (an array item) and returns
            an arbitrary value. The function will iterate through the array
            and call this callback for every array item. The array items are
            grouped by the callback's return value.
---
## Syntax

```ts
function groupBy<T, TProp>(array: T[], property: (item: T) => TProp): T[][];
```

<div class="description">{{ page.description | markdownify }}</div>
{% include parameters.html %}

## Example

```ts
import { Arrays } from 'potence';

const videos = [
    { creator: 'generic-youtuber', title: 'CODING GONE SEXUAL!', views: 32412 },
    { creator: 'generic-youtuber', title: 'CODING GOES HORRIBLY WRONG!', views: 12111 },
    { creator: 'generic-streamer', title: 'playing this video game idk lol', views: 321 }
];

const result = Arrays.groupBy(videos, video => video.creator);

console.log(result);
// -> [
//     [
//         { creator: 'generic-youtuber', title: 'CODING GONE SEXUAL!', views: 32412 },
//         { creator: 'generic-youtuber', title: 'CODING GOES HORRIBLY WRONG!', views: 12111 }
//     ],
//     [
//         { creator: 'generic-streamer', title: 'playing this video game idk lol', views: 321 }
//     ]
// ]
```

## Remarks

Instead of returning a property contained in the array item, you can return
anything you'd like from the property callback, including the result of an
arbitrary calculation and even a `boolean`. This allows you to, for example,
divide an array of numbers into two arrays: one that is below a certain
threshold and one that is at or above by simply using a *greater or equals*
(`>=`) sign.

Note that this function uses [`Objects.equal()`]({% link docs/Objects/equal.md
%}) to compare the callback results with each other, so returning an object that
implements [`Equatable`]({% link docs/Types/Equatable.md %}) from the callback
will compare the return values using `Equatable.equals()`.
