require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
const users = require("./model/Userschema")
const router = require("./router/Routes")
require("./db/conn")

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("server start")
})

app.use(router)
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log("server has started");
})