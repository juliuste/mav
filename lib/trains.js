'use strict'

const got = require('got')
const isString = require('lodash/isString')

const transformFlag = (f) => ({
	id: f.ID,
	description: f.SzolgNev || null,
	directions: f.Viszonylat || null
})

const transformStop = (s) => ({
	type: 'station',
	id: s.AllomasID,
	platform: s.Vagany || null,
	kilometers: +s.Km || null,
	arrival: s.Ido.ErkMDatum ? new Date(+s.Ido.ErkMDatum * 1000) : new Date(+s.Ido.IndMDatum * 1000), // todo
	departure: s.Ido.IndMDatum ? new Date(+s.Ido.IndMDatum * 1000) : new Date(+s.Ido.ErkMDatum * 1000)
})

const createTrain = (t) => ({
	id: t.Vonat.ID,
	number: t.Vonat.Szam,
	name: t.Vonat.Nev || null,
	description: t.Vonat.Viszonylat || null,
	service: t.Vonat.Tipus[0] ? {
		name: t.Vonat.Tipus[0].Tipus,
		color: t.Vonat.Tipus[0].Szin || null
	} : null,
	flags: t.Vonat.Szolgaltatasok.map(transformFlag),
	stops: t.Menetrend.map(transformStop)
})

const trains = (train) => {
	if (isString(train)) train = { id: train }
	if (!isString(train.id)) throw new Error('invalid or missing train id')
	train = train.id

	return got.post('http://vim.mav-start.hu/VIM/PR/150225/MobileService.svc/rest/GetVonatInfo', {
		json: true,
		headers: {
			'User-Agent': 'Fiddler'
		},
		body: {
			'VonatID': train,
			'Nyelv': 'EN',
			'UAID': '2Juija1mabqr24Blkx1qkXxJ105j'
		}
	})
		.then((res) => res.body)
		.then(createTrain)
		// eslint-disable-next-line handle-callback-err
		.catch((err) => null)
}

module.exports = trains
