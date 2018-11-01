'use strict'

const got = require('got')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')

const transformFlag = (f) => ({
	id: f.ID,
	description: f.SzolgNev || null,
	directions: f.Viszonylat || null
})

const hashLeg = (l) => l.origin + '@' + l.departure.toISOString() + '@' + l.destination + '@' + l.arrival.toISOString() + '@' + (l.train ? l.train.id + '-' + l.train.number : 'notrain')
const hashLegs = (legs) => legs.map(hashLeg).join('-')

const transformLeg = (l) => ({
	mode: 'train', // todo
	public: true, // todo
	operator: { // todo
		type: 'operator',
		id: 'máv',
		name: 'Magyar Államvasutak',
		url: 'https://www.mavcsoport.hu'
	},
	origin: l.IndAllomasID,
	destination: l.ErkAllomasID,
	arrival: l.Ido.ErkMDatum ? new Date(+l.Ido.ErkMDatum * 1000) : new Date(+l.Ido.IndMDatum * 1000), // todo
	departure: l.Ido.IndMDatum ? new Date(+l.Ido.IndMDatum * 1000) : new Date(+l.Ido.ErkMDatum * 1000),
	arrivalPlatform: (l.ErkVagany && l.ErkVagany !== ' ') ? l.ErkVagany : null,
	departurePlatform: (l.IndVagany && l.IndVagany !== ' ') ? l.IndVagany : null,
	train: l.Vonat.ID ? {
		id: l.Vonat.ID,
		number: l.Vonat.Szam,
		name: l.Vonat.Nev || null,
		description: l.Viszonylat || null,
		service: l.Vonat.Tipus[0] ? {
			name: l.Vonat.Tipus[0].Tipus,
			color: l.Vonat.Tipus[0].Szin || null
		} : null,
		flags: l.Vonat.Szolgaltatasok.map(transformFlag)
	} : null,
	description: l.HelyiKozLeiras || null
})

const createJourney = (j) => {
	const journey = {
		type: 'journey',
		flags: (j.Potjegyek || []).map(transformFlag),
		legs: j.Reszletek.map(transformLeg),
		kilometers: j.Km || null,
		price: (j.Ar && j.Ar > 0) ? {
			amount: j.Ar,
			currency: 'HUF' // todo
		} : null
	}
	journey.id = hashLegs(journey.legs)
	return journey
}

const journeys = (origin, destination, date = new Date()) => {
	if (isString(origin)) origin = { id: origin, type: 'station' }
	if (!isString(origin.id)) throw new Error('invalid or missing origin id')
	if (origin.type !== 'station') throw new Error('invalid or missing origin type')
	origin = origin.id

	if (isString(destination)) destination = { id: destination, type: 'station' }
	if (!isString(destination.id)) throw new Error('invalid or missing destination id')
	if (destination.type !== 'station') throw new Error('invalid or missing destination type')
	destination = destination.id

	if (!isDate(date)) {
		throw new Error('invalid `date` parameter')
	}

	return got.post('http://vim.mav-start.hu/VIM/PR/150225/MobileService.svc/rest/GetUtazasiAjanlat', {
		json: true,
		headers: {
			'User-Agent': 'Fiddler'
		},
		body: {
			'CelAllomasID': destination,
			'IndAllomasID': origin,
			'Datum': Math.round(+date / 1000),
			'IndulasiIdo': true,
			'Nyelv': 'EN',
			'SzuresiFeltetelek': [],
			'UAID': '2Juija1mabqr24Blkx1qkXxJ105j'
		}
	})
		.then((res) => res.body)
		.then((res) => res.Ajanlatok)
		.then((res) => res.map(createJourney))
		// eslint-disable-next-line handle-callback-err
		.catch((err) => [])
}

module.exports = journeys
