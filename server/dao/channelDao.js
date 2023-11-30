// 引入模型
const channelModel = require("../models/channelModel");

/**
 * 根据 id 获取其中一本书籍信息
 */
module.exports.findChannelDao = async function () {
  return channelModel.find()
};

