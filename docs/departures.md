# `departures(station, date = new Date())`

Get departures at a given station for a given date. Ignores the time and returns all departures for the given day in timezone `Europe/Budapest`. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in a list of `departure` objects.

`station` can either be

- `station` id like `829`
- `station` object like `{type: 'station', id: '829'}`

```js
const mav = require('mav')

mav.departures('829', new Date()) // Budapest-Keleti
.then(console.log)
```

## Response

```js
[
    {
        "type": "departure",
        "train": {
            "id": "76879_171113",
            "number": 3351,
            "name": null,
            "description": "22:19 Szolnok --",
            "service": {
                "name": "BESZ",
                "color": "#000000"
            },
            "flags": [
                {
                    "id": "337",
                    "description": "Suburban train",
                    "directions": null
                }
                // …
            ]
        },
        "arrival": "2017-11-13T23:15:00.000Z",
        "departure": "2017-11-13T23:15:00.000Z"
    }
    // …
]
```
