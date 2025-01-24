const express = require("express")
const cors = require("cors")
const app = express()

const logger = require("./logger")
const countryRouter = require("./routers/countries")
const leaderRouter = require("./routers/leaders")


// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/countries", countryRouter)
app.use("/leaders", leaderRouter)

module.exports = app