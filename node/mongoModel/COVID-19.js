const mongoose = require("mongoose")

// 存储疫情数据
const COVID_19Rule = mongoose.Schema({
  news: Object,
  desc: Object,
  riskarea: Object,
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("COVID-19", COVID_19Rule);
