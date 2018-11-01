'use strict'

const got = require('got')

const parseNumber = (x) => +x.split(',').join('.')

const createStation = (s) => {
	const station = {
		type: 'station',
		id: s.ID,
		name: s.Nev
	}
	if (s.GpsLon && s.GpsLon.length > 0 && s.GpsLat && s.GpsLat.length > 0) {
		station.coordinates = {
			longitude: parseNumber(s.GpsLon),
			latitude: parseNumber(s.GpsLat)
		}
	}
	return station
}

const stations = () =>
	got.post('http://vim.mav-start.hu/VIM/PR/150225/MobileService.svc/rest/GetAlapadatok', {
		json: true,
		headers: {
			'User-Agent': 'Fiddler'
		},
		body: {
			'AllomasIdoBelyeg': '1000',
			'ErtekelesIdoBelyeg': '1000',
			'KedvezmenyIdoBelyeg': '1000',
			'UAID': '2Juija1mabqr24Blkx1qkXxJ105j'
		}
	})
		.then((res) => res.body)
		.then((res) => res.Allomasok.AllomasLista)
		.then((res) => res.map(createStation))
		// eslint-disable-next-line handle-callback-err
		.catch((err) => [])

module.exports = stations
