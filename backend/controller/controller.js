const plantModel = require("../model/model");

let plantController = {
    getAllData: async (req, res) => {
        let allplant = await plantModel.find()
        res.send(allplant)
    },
    getDataById: async (req, res) => {
        let { id } = req.params
        let plant = await plantModel.findById(id)
        res.send(plant)
    },
    deleteData: async (req, res) => {
        let { id } = req.params
        await plantModel.findByIdAndDelete(id)
        res.send({
            message: "Success Delete!"
        })
    },
    postData: async (req, res) => {
        await plantModel(req.body).save()
        res.send({
            message: "Success Post!",
            data: req.body
        })
    }
}

module.exports = plantController