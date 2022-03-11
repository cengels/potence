---
layout:      page
title:       Arrays.groupBy()
module:      Arrays
added:       0.2.0
updated:     0.6.0
description: Creates a two-dimensional array by grouping the values in the
             original array by the return value of the property callback.
parameters:
  array: An array with any number of elements.
  property: A callback accepting one parameter (an array item) and returns
            an arbitrary value. The function will iterate through the array
            and call this callback for every array item. The array items are
            grouped by the callback's return value.
  mapGroup:
    description: A callback to map each group into some other form. By default
                 groupBy() maps each group to its own array inside the result
                 array. Using this parameter, you can return something else
                 instead, like an object.
    optional: yes
---
## Syntax

```ts
function groupBy<T, TProp>(array: T[], property: (item: T) => TProp): T[][];
function groupBy<T, TProp, Result>(array: T[], property: (item: T) => TProp, mapGroup: (property: TProp, items: readonly T[]) => Result): Result[];
```

<div class="description">{% include linkify.html description=page.description %}</div>
{% include parameters.html %}

## Example 1

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

## Example 2

```ts
import { Arrays } from 'potence';

const videos = [
    { creator: 'generic-youtuber', title: 'CODING GONE SEXUAL!', views: 32412 },
    { creator: 'generic-youtuber', title: 'CODING GOES HORRIBLY WRONG!', views: 12111 },
    { creator: 'generic-streamer', title: 'playing this video game idk lol', views: 321 }
];

const result = Arrays.groupBy(videos, video => video.creator, (property, items) => ({ creator: property, items }));

console.log(result);
// -> [
//     {
//         creator: 'generic-youtuber',
//         items: [
//             { creator: 'generic-youtuber', title: 'CODING GONE SEXUAL!', views: 32412 },
//             { creator: 'generic-youtuber', title: 'CODING GOES HORRIBLY WRONG!', views: 12111 }
//         ]
//     },
//     {
//         creator: 'generic-streamer',
//         items: [
//             { creator: 'generic-streamer', title: 'playing this video game idk lol', views: 321 }
//         ]
//     }
// ]
```

## Remarks

Be careful when using the `mapGroup` optional callback, as this callback is
executed only once when the respective group is **first created**. The
`items` argument will therefore **always have only one element**. Do **not**
use this callback to aggregate the items in some form. Use the return value
instead.

Instead of returning a property contained in the array item, you can return
anything you'd like from the property callback, including the result of an
arbitrary calculation and even a `boolean`. This allows you to, for example,
divide an array of numbers into two arrays: one that is below a certain
threshold and one that is at or above by simply using a *greater or equals*
(`>=`) sign.

Note that this function uses [`Objects.equal()`]({{ site.baseurl }}{% link _pages/Objects/equal.md
%}) to compare the callback results with each other, so returning an object that
implements [`Equatable`]({{ site.baseurl }}{% link _pages/Types/Equatable.md %}) from the callback
will compare the return values using `Equatable.equals()`.
