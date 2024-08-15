import request from '@/utils/request'

export function getRouterList(data) {
  return request({
    url: '/api/MenuManager/GetMenuByUserId',
    method: 'post',
    data,
  })
}

export function getFunPerssion(data) {
  return request({
    url: '/api/MenuManager/GetFunByUserId',
    method: 'post',
    data,
  })
}
