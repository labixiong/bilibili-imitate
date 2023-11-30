const express = require('express')
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require('path')
const createError = require("http-errors");

const { ServiceError, UnknownError } = require("./utils/errors");

// 默认读取项目根目录下的 .env 环境变量文件
require("dotenv").config();
// 进行数据库初始化
require("./db/init");

const navbarRouter = require("./routes/navbar");
const channelRouter = require('./routes/channel')

const app = express()

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 使用路由中间件
app.use("/api/navbar", navbarRouter);
app.use('/api/channel', channelRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理，一旦发生了错误，就会到这里来
app.use(function (err, req, res, next) {
  if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnknownError().toResponseJSON());
    throw err;
  }
});

module.exports = app