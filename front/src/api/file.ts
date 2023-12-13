import { AxiosProgressEvent } from 'axios'
import request from '../utils/request'

/**
 * 视频上传接口
 */
export function postVideoApi(data: FormData, onUploadProgress: (e: AxiosProgressEvent) => void) {
  return request({
    url: '/api/upload',
    method: 'POST',
    data,
    onUploadProgress
  })
}

/**
 * 大文件切片合并
 */
export function postVideoMergeApi(data: object) {
  return request({
    url: '/api/upload/merge',
    method: 'POST',
    data
  })
}


/**
 * 
 */
export function checkHashApi(data: FormData) {
  return request({
    url: '/api/upload/checkhash',
    method: 'POST',
    data
  })
}