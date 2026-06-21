const plantController = require("../controller/controller");
const express = require("express")
const route = express.Router()

route.get("/", plantController.getAllData)
route.get("/:id", plantController.getDataById)
route.delete("/:id", plantController.deleteData)
route.post("/", plantController.postData)

module.exports = route