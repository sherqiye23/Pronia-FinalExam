const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.Connect)
.then(() => console.log("Connected!"))
.catch((err) => console.log("Failed: ", err))