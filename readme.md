# mav

Client for the [Magyar Államvasutak](https://www.mavcsoport.hu) (MÁV, Hungarian State Railways) REST API. Inofficial, please ask MÁV for permission before using this module in production.

[![npm version](https://img.shields.io/npm/v/mav.svg)](https://www.npmjs.com/package/mav)
[![Build Status](https://travis-ci.org/juliuste/mav.svg?branch=master)](https://travis-ci.org/juliuste/mav)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/mav.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/mav.svg)](https://david-dm.org/juliuste/mav)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/mav.svg)](https://david-dm.org/juliuste/mav#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/mav.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save mav
```

## Usage

This package mostly returns data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format):

- [`stations()`](docs/stations.md) - List of operated stations
- [`departures(station, date = new Date())`](docs/departures.md) - Departures at a given station
- [`trains(trainId)`](docs/trains.md) - Schedule for a given train
- [`journeys(origin, destination, date = new Date())`](docs/journeys.md) - Journeys between stations

## See also

- [build-mav-gtfs](https://github.com/juliuste/build-mav-gtfs) - Generate MÁV GTFS using this module

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/mav/issues).
