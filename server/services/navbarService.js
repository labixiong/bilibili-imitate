const {
  findNavbarDao
} = require("../dao/navbarDao");

/**
 * 按分页查询书籍
 */
module.exports.findNavbarService = async function () {
  return await findNavbarDao();
};
