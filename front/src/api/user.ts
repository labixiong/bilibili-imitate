import request from "../utils/request";

/**
 * 用户相关的 api 都放在这里
 */

export function getCaptcha() {
  return request({
    url: "/api/res/captcha",
    method: "GET",
  });
}

/**
 * 查询用户是否存在
 */
export function userIsExist(loginId: string) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET",
  });
}

/**
 * 用户注册
 */
export function addUser(newUserInfo: any) {
  return request({
    url: "/api/user",
    data: newUserInfo,
    method: "POST",
  });
}

/**
 * 用户登录
 */
export function userLogin(loginInfo: any) {
  return request({
    url: "/api/user/login",
    method: "POST",
    data: loginInfo,
  });
}

/**
 * 根据 id 来查找用户
 */
export function getUserById(id: string) {
  return request({
    url: `/api/user/${id}`,
    method: "GET",
  });
}

/**
 * 恢复登录状态
 */
export function getInfo() {
  return request({
    url: "/api/user/whoami",
    method: "GET",
  });
}

/**
 * 获取积分前十的用户
 */
export function getUserByPointsRank(){
  return request({
    url : "/api/user/pointsrank",
    method : "GET",
  })
}

/**
 * 根据id修改用户
 */
export function editUser(userId: string, userInfo: any) {
  return request({
    url: `/api/user/${userId}`,
    method: 'PATCH',
    data: userInfo
  })
}

/**
 * 验证用户账号密码是否正确
 */
export function checkPassword(userId: string, loginPwd: string) {
  return request({
    url: '/api/user/passwordcheck',
    method: 'POST',
    data: {
      userId,
      loginPwd
    }
  })
}
