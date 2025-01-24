const Leader = require("../models/Leader")
const removeUnderScore = require("../helpers/removeUnderScores")


const index = async (req, res) => {
    try {
        const leaders = Leader.getAll()
        res.status(200).json(leaders)
    } catch (err){
        res.status(500).json({ error: err.message })
    }
}

const show = async (req, res) => {
    try {
        const name = removeUnderScore(req.params.name)
        const leaderAndCountry = await Leader.getFullInfo(name)
        res.status(200).json(leaderAndCountry)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    index, show
}