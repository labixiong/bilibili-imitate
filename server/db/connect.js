/**
 * 该文件负责连接数据库
 */

const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME

// 定义链接数据库字符串
const dbURI = "mongodb://" + process.env.DB_HOST + "/" + DB_NAME;

// 连接
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// 监听
mongoose.connection.on("connected", function () {
  console.log(`${DB_NAME} 数据库已经连接...`);
});
