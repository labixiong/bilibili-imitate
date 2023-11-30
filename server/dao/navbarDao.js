// 引入模型
const navbarModel = require("../models/navbarModel");

/**
 * 根据 id 获取其中一本书籍信息
 */
module.exports.findNavbarDao = async function () {
  return navbarModel.find()
};

