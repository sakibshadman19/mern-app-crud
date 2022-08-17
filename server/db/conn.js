const mongoose = require("mongoose")

const mongo = process.env.DATABASE

mongoose.connect(mongo,{

}).then(()=> console.log("mongodb is connected")).catch((error)=> console.log(error.message))