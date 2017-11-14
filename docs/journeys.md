# `journeys(origin, destination, date = new Date())`

Get directions and prices for routes from A to B. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve with an array of `journey`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format) which looks as follows.
*Note that the results are not fully spec-compatible, as all dates are represented by JS `Date()` objects instead of ISO strings and the `schedule` is missing in legs.*

`origin` and `destination` can either be

- `station` ids like `829`
- `station` objects like `{type: 'station', id: '829'}`

```js
const mav = require('mav')

mav.journeys('829', {type: 'station', id: '817'}, new Date()) // Keleti -> Kelenföld
.then(console.log)
```

## Response

```js
[
    {
        "type": "journey",
        "flags": [],
        "legs": [
            {
                "mode": "train",
                "public": true,
                "operator": {
                    "type": "operator",
                    "id": "máv",
                    "name": "Magyar Államvasutak",
                    "url": "https://www.mavcsoport.hu"
                },
                "origin": "829",
                "destination": "1612",
                "arrival": "2017-11-14T04:58:00.000Z",
                "departure": "2017-11-14T04:50:00.000Z",
                "departurePlatform": null,
                "train": {
                    "id": "74972_171114",
                    "number": 7912,
                    "name": null,
                    "description": null,
                    "service": {
                        "color": "#000000"
                    },
                    "flags": [
                        {
                            "id": "339",
                            "description": "Long distance train",
                            "directions": null
                        }
                        // …
                    ]
                },
                "description": null
            },
            {
                "mode": "train",
                "public": true,
                "operator": {
                    "type": "operator",
                    "id": "máv",
                    "name": "Magyar Államvasutak",
                    "url": "https://www.mavcsoport.hu"
                },
                "origin": "1612",
                "destination": "2560",
                "arrival": "2017-11-14T05:11:00.000Z",
                "departure": "2017-11-14T05:05:00.000Z",
                "departurePlatform": null,
                "train": {
                    "id": "78561_171114",
                    "number": 3810,
                    "name": null,
                    "description": null,
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
                "description": null
            }
        ],
        "kilometers": 13,
        "price": {
            "amount": 310,
            "currency": "HUF"
        },
        "id": "829@2017-11-14T04:50:00.000Z@1612@2017-11-14T04:58:00.000Z@74972_171114-7912-1612@2017-11-14T05:05:00.000Z@2560@2017-11-14T05:11:00.000Z@78561_171114-3810"
    }
    // …
]
```
