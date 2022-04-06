const mongoose = require("mongoose");

//海外疫情动态
const COVID_19_worldRule = new mongoose.Schema({
  newslist: Array,
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("COVID_19_world", COVID_19_worldRule);
