'use strict'

const got = require('got')
const isString = require('lodash.isstring')
const isDate = require('lodash.isdate')

const transformFlag = (f) => ({
    id: f.ID,
    description: f.SzolgNev || null,
    directions: f.Viszonylat || null
})

const createDeparture = (d) => ({
    type: 'departure',
    train: {
        id: d.Vonat.ID,
        number: d.Vonat.Szam,
        name: d.Vonat.Nev || null,
        description: d.Viszonylat || null,
        service: d.Vonat.Tipus[0] ? {
            name: d.Vonat.Tipus[0].Tipus,
            color: d.Vonat.Tipus[0].Szin || null
        } : null,
        flags: d.Vonat.Szolgaltatasok.map(transformFlag)
    },
    arrival: d.Ido.ErkMDatum ? new Date(+d.Ido.ErkMDatum*1000) : new Date(+d.Ido.IndMDatum*1000), // todo
    departure: d.Ido.IndMDatum ? new Date(+d.Ido.IndMDatum*1000) : new Date(+d.Ido.ErkMDatum*1000)
})

const departures = (station, date = new Date()) => {
    if(isString(station)) station = {id: station, type: 'station'}
    if(!isString(station.id)) throw new Error('invalid or missing station id')
    if(station.type !== 'station') throw new Error('invalid or missing station type')
    station = station.id

    if(!isDate(date)){
        throw new Error('invalid `date` parameter')
    }

    return got.post('http://vim.mav-start.hu/VIM/PR/150225/MobileService.svc/rest/GetAllomasInfo', {
        json: true,
        headers: {
            'User-Agent': 'Fiddler'
        },
        body: {
            "AllomasID": station,
            "Datum": Math.round(+date/1000),
            "Nyelv": "EN",
            "UAID": "2Juija1mabqr24Blkx1qkXxJ105j"
        }
    })
    .then((res) => res.body)
    .then((res) => res.Menetrend)
    .then((res) => res.map(createDeparture))
    .catch((err) => [])
}

module.exports = departures
