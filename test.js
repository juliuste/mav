'use strict'

const tapeWithoutPromise = require('tape')
const addPromiseSupport = require('tape-promise').default
const tape = addPromiseSupport(tapeWithoutPromise)
const mav = require('.')
const isString = require('lodash.isstring')
const isNumber = require('lodash.isnumber')
const isDate = require('lodash.isdate')
const isObject = require('lodash.isobject')
const moment = require('moment-timezone')

const isStation = (s) => s.type === 'station' && isString(s.id) && s.id.length >= 1
const isFlag = (f) => isString(f.id) && f.id.length > 0 && isString(f.description) && f.description.length > 0
const isTrainStop = (s) => isStation(s) && isDate(s.arrival) && isDate(s.departure) && +s.departure >= +s.arrival

const isMAV = (o) => o.type === 'operator' && o.id === 'máv' && o.name === 'Magyar Államvasutak' && o.url === 'https://www.mavcsoport.hu'

tape('mav', async (t) => {
	// stations
	const stations = await mav.stations()
	t.ok(stations.length > 50, 'stations length')
	const keleti = stations.find((x) => x.name === 'Budapest-Keleti')
	t.ok(keleti.type === 'station', 'station type')
	t.ok(isString(keleti.id) && keleti.id.length > 0, 'station id')
	t.ok(isString(keleti.name) && keleti.name.length > 4, 'station name')
	t.ok(isNumber(keleti.coordinates.longitude) && keleti.coordinates.longitude > 0, 'station coordinates longitude')
	t.ok(isNumber(keleti.coordinates.latitude) && keleti.coordinates.latitude > 0, 'station coordinates latitude')

	// departures
	const date = moment.tz('Europe/Budapest').add(3, 'days').toDate()
	const departures = await mav.departures(keleti, date)
	t.ok(departures.length > 2, 'departures length')
	const departure = departures.find((x) => isObject(x.train.service))
	t.ok(departure.type === 'departure', 'departure type')
	t.ok(isObject(departure.train), 'departure train')
	t.ok(isString(departure.train.id) && departure.train.id.length > 0, 'departure train id')
	t.ok(isNumber(departure.train.number), 'departure train number')
	t.ok(isString(departure.train.service.name) && departure.train.service.name.length > 0, 'departure service name')
	t.ok(Array.isArray(departure.train.flags) && departure.train.flags.every(isFlag), 'departure train flags')
	t.ok(isDate(departure.arrival), 'departure arrival')
	t.ok(isDate(departure.departure), 'departure departure')
	t.ok(+departure.arrival <= +departure.departure, 'departure arrival < departure')

	// trains
	const train = await mav.trains(departure.train.id)
	t.ok(isString(train.id) && train.id.length > 0, 'train id')
	t.ok(isNumber(train.number), 'train number')
	t.ok(isString(train.service.name) && train.service.name.length > 0, 'train service name')
	t.ok(Array.isArray(train.flags) && train.flags.every(isFlag), 'train flags')
	t.ok(train.stops.every(isTrainStop), 'train stops')

	// journeys
	const kelenfoeld = stations.find((x) => x.name.indexOf('Kelenföld')>=0)
	const journeys = await mav.journeys(keleti, kelenfoeld, date)
	t.ok(journeys.length >= 1, 'journeys length')
	const journey = journeys[0]
	t.ok(journey.type === 'journey', 'journey type')
	if(isObject(journey.price)){
		t.ok(isNumber(journey.price.amount) && journey.price.amount > 0, 'journey price amount')
		t.ok(journey.price.currency === 'HUF', 'journey price currency')
	}
	t.ok(journey.legs.length >= 1, 'journey legs length')
	const leg = journey.legs.find((x) => isObject(x.train))
	t.ok(isString(leg.origin) && leg.origin.length > 1, 'journey leg origin')
	t.ok(isString(leg.destination) && leg.destination.length > 1, 'journey leg destination')
	t.ok(isDate(leg.arrival), 'journey leg arrival')
	t.ok(isDate(leg.departure), 'journey leg departure')
	t.ok(+leg.arrival >= +leg.departure, 'journey leg arrival > departure')
	t.ok(isString(leg.train.id) && leg.train.id.length > 1, 'journey leg train id')
	t.ok(isNumber(leg.train.number), 'journey leg train number')
	t.ok(isMAV(leg.operator), 'journey leg operator')
	t.ok(leg.mode === 'train', 'journey leg mode')
	t.ok(leg.public === true, 'journey leg public')

	t.end()
})
