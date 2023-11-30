/**
 * 书籍模块对应二级路由
 */

const express = require("express");
const router = express.Router();

// 引入业务层方法
const {
  findChannelService
} = require("../services/channelService");

const { formatResponse } = require("../utils/util");

/**
 * 获取导航菜单列表
 */
router.get("/", async function (req, res) {
  const result = await findChannelService();
  res.send(formatResponse(0, "", result));
});

module.exports = router;
