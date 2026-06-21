const mongoose = require("mongoose")

let plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Required"]
    },
    price: {
        type: Number,
        required: [true, "Required"]
    },
    image: {
        type: String,
        required: [true, "Required"]
    }
})

let plantModel = mongoose.model("plant", plantSchema)

module.exports = plantModel