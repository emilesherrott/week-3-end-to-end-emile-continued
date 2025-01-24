const Country = require("../models/Country")
const removeUnderScore = require("../helpers/removeUnderScores")

async function index(req, res) {
    try {
        const countries = await Country.getAll()
        res.status(200).json(countries)

    } catch(err) {
        res.status(500).json({ error: err.message})
    }
}

async function show(req, res) {
    try {
        let name = removeUnderScore(req.params.name)
        const country = await Country.getOneByCountryName(name)
        res.status(200).json(country)

    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const newCountry = await Country.create(data)
        res.status(201).json(newCountry)

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const name = removereq.params.name
        const updateInfo = req.body
        const countryToUpdate = await Country.getOneByCountryName(name)
        console.log(countryToUpdate)
        const updatedCountry = await countryToUpdate.update(updateInfo)
        res.status(200).json(updatedCountry)

    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

async function destroy(req, res) {
    try {
        const name = removeUnderScore(req.params.name)
        const country = await Country.getOneByCountryName(name)
        const result = await country.destroy()
        res.status(204).end()

    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = { index, show, create, update, destroy }