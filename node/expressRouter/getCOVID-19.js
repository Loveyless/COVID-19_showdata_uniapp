const express = require("express");
const router = express.Router();
const COVID_19_Model = require("../mongoModel/COVID-19");
const COVID_19_world_Model = require("../mongoModel/COVID_19_world")

//获取国内疫情数据
router.get("/COVID_19", (req, res, next) => {
  COVID_19_Model.find({}, (err, data) => {
    res.json({
      data:data[0]
    });
  });
});

//获取海外疫情数据
router.get("/COVID_19_world", (req, res, next) => {
  COVID_19_world_Model.find({}, (err, data) => {
    res.json({
      data
    });
  });
});



module.exports = router;
