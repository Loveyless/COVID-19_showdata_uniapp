const mongoose = require("mongoose")


module.exports = new Promise((resolve, reject) => {

  mongoose.connect("mongodb://localhost:27017/COVID-19",(err,res) => {
    err && reject(err)
    resolve()
  })

}) 
