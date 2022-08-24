const express = require("express");
const app = express();
const port = 7000;

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const multer = require("multer");
const uuid = require("uuid");
const uploadTools = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "static");
    },
    filename: (req, file, callback) => {
      let name = file.originalname;
      let ext = name.substr(name.lastIndexOf("."));
      let newName = uuid.v4() + ext;
      callback(null, newName);
    },
  }),
});
//配置静态资源托管文件夹 直接通过http://localhost:7000+文件命 直接访问
app.use(express.static("static"));
app.post("/upload", uploadTools.single("file"), (req, res) => {
  let url = "http://localhost:7000/" + req.file.filename;
  res.send({ code: 200, data: url });
});

app.listen(port, () => {
  console.log("上传文件服务已启动...");
});
