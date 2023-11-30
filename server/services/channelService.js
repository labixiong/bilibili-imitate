const {
  findChannelDao
} = require("../dao/channelDao");

/**
 * 按分页查询书籍
 */
module.exports.findChannelService = async function () {
  return await findChannelDao();
};
