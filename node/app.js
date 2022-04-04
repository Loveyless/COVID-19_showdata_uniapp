const express = require("express");
const app = express();
const db = require("./db.js");
const COVID_19_Model = require("./mongoModel/COVID-19");
const COVID_19_world_Model = require("./mongoModel/COVID_19_world")
const axios = require("axios");
const getCOVID_19Router = require("./expressRouter/getCOVID-19")


// 设置跨域和相应数据格式
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.sendStatus(200)
  /*让options请求快速返回*/ else next()
})



db.then(
  async() => {
    console.log("数据库连接成功");




    //十分钟获取一次数据
    setInterval(async() => {

    //删除之前的数据
    COVID_19_Model.deleteMany({},(err) => { 
      err && console.log(err.message);
    })
    COVID_19_world_Model.deleteMany({},(err) => { 
      err && console.log(err.message);
    })

    //获取数据存入数据
    const data1 = await axios.get("http://api.tianapi.com/ncov/index?key=bba54c417b3678e22505a1ef69b47fd0");
    COVID_19_Model.create(data1.data.newslist[0]);
    const data2 = await axios.get("http://api.tianapi.com/ncovabroad/index?key=bba54c417b3678e22505a1ef69b47fd0")
    COVID_19_world_Model.create(data2.data)

    }, 650000);


    app.use(getCOVID_19Router)


  },
  (err) => {
    console.log("数据库连接失败", err);
  }
);

app.listen(4000, (err) => {
  err && console.log("服务器开启失败", err);
  console.log("服务器开启成功");
});
