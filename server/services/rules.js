const { validate } = require("validate.js");
const { findUserByLoginId } = require("../dao/userDao");

/**
 * 用户验证规则
 */
exports.userRule = {
  loginId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    userLoginIdIsExist: true,
  },
};

/**
 * 扩展验证规则
 * @returns
 */
validate.validators.userLoginIdIsExist = async function (loginId) {
  const userInfo = await findUserByLoginId(loginId);
  if (userInfo.length) {
    return "loginId is already exist";
  }
  return;
};
