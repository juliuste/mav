# `trains(trainId)`

Get timetable for a given train id. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in a timetable object or `null` if no matching train is found.

```js
const mav = require('mav')

mav.trains("76879_171113")
.then(console.log)
```

## Response

```js
{
    "id": "76879_171113",
    "number": 3351,
    "name": null,
    "description": "Szolnok - Budapest-Keleti",
    "service": {
        "name": "passenger train",
        "color": "#000000"
    },
    "flags": [
        {
            "id": "337",
            "description": "Suburban train",
            "directions": null
        }
        // …
    ],
    "stops": [
        {
            "type": "station",
            "id": "5580",
            "platform": " ",
            "kilometers": null,
            "arrival": "2017-11-13T21:19:00.000Z",
            "departure": "2017-11-13T21:19:00.000Z"
        },
        {
            "type": "station",
            "id": "6474",
            "platform": " ",
            "kilometers": 11,
            "arrival": "2017-11-13T21:28:00.000Z",
            "departure": "2017-11-13T21:29:00.000Z"
        },
        // …
        {
            "type": "station",
            "id": "829",
            "platform": " ",
            "kilometers": 100,
            "arrival": "2017-11-13T23:15:00.000Z",
            "departure": "2017-11-13T23:15:00.000Z"
        }
    ]
}
```
