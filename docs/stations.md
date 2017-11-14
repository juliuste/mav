# `stations()`

Get a list of all operated stations. Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an array of `station`s in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format). (_This request may take a few seconds._)

```js
const mav = require('mav')

mav.stations()
.then(console.log)
```

## Response

```js
[
    // …
    {
        "type": "station",
        "id": "5",
        "name": "Abádszalók",
        "coordinates": {
            "longitude": 20.5552885364444,
            "latitude": 47.4555515822199
        }
    },
    {
        "type": "station",
        "id": "6",
        "name": "Abaliget",
        "coordinates": {
            "longitude": 18.0757954202845,
            "latitude": 46.1531355865627
        }
    },
    {
        "type": "station",
        "id": "7",
        "name": "Aba-Sárkeresztúr",
        "coordinates": {
            "longitude": 18.5430408437554,
            "latitude": 47.0240296794588
        }
    }
    // …
]
```
