const { Router } = require("express")

const leaderController = require("../controllers/leaders")

const leaderRouter = Router()

leaderRouter.get("/:name", leaderController.index)
leaderRouter.get("/nations/:name", leaderController.show)

module.exports = leaderRouter