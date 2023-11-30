/**
 * 书籍模块对应二级路由
 */

const express = require("express");
const router = express.Router();

// 引入业务层方法
const {
  findNavbarService
} = require("../services/navbarService");

const { formatResponse } = require("../utils/util");

/**
 * 获取导航菜单列表
 */
router.get("/", async function (req, res) {
  const result = await findNavbarService();
  res.send(formatResponse(0, "", result));
});

module.exports = router;
