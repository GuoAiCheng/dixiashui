import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName } from '@/config'

export function login(data) {
  return request({
    url: '/api/Login/LoginAuth',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
// export function getUserInfo(usrId) {
//   return request({
//     url: '/api/MenuManager/GetFunByUserId',
//     method: 'post',
//     data: {
//       usrId,
//     },
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

export function getUserInfo(usrId) {
  return request({
    url: '/api/MenuManager/GetMenuByUserId',
    method: 'post',
    data: {
      usrId,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
