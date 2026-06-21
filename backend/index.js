const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const route = require("./routers/router")
require("./config/config")
app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json())
dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
app.use("/plant", route)
