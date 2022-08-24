const express = require("express");
const app = express();
const port = 5000; // 服务端口

// 配置跨域
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// 解析post请求参数
app.use(express.urlencoded());

/** 接口， 处理/请求 */
app.listen(port, () => {
  console.log("涮涮火锅点餐系统后端服务已启动...");
});

app.use(require("./router/foods"));
