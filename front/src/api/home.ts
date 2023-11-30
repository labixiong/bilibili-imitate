import request from '../utils/request'

/**
 * 头部导航栏左侧的板块数据
 */
export function getNavbarList() {
  return request({
    url: '/api/navbar',
    method: 'GET'
  })
}

/**
 * 频道列表
 */
export function getChannelList() {
  return request({
    url: '/api/channel',
    method: 'GET'
  })
}
