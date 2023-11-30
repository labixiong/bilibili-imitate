// 格式化要响应的数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    code,
    msg,
    data,
  };
};