const express = require("express")
require("dotenv").config()
const cors = require('cors')
const cookieParser = require("cookie-parser");

const DBconfig = require("./config/DBconfig")
DBconfig()

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const app = express()
const port = process.env.PORT || 4000


app.listen(port, () => console.log(`app listening on port ${port}`))