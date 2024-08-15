/**
 * @author https://github.com/zxwk1998/vue-admin-better （不想保留author可删除）
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList, getFunPerssion } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'
import { getSession, setSession } from '@/utils/storage'
import store from '@/store'
// var Enumerable = require('linq')
const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    // debugger
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    // debugger
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions)
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  async setAllRoutes({ commit }, id) {
    if (id == null) {
      //  // ;
      // var userinfo = store.getters['user/info']
      var userinfo = JSON.parse(getSession('userinfo'))
      let { data } = await getRouterList({ usrId: userinfo.userId })
      // debugger
      var res = await getFunPerssion({ usrId: userinfo.userId })
      sessionStorage.setItem('functionData', JSON.stringify(res.data))
      let accessRoutes = convertRouter(data)
      // var first = Enumerable.from(accessRoutes).where("a=>a.meta.title=='首页'").toArray()
      var first = []
      for (var i = 0; i < accessRoutes.length; i++) {
        if (accessRoutes[i].meta.title == '首页') {
          first.push(accessRoutes[i])
        }
      }
      setSession('menudata', data)
      commit('setAllRoutes', first)
      // debugger
      return data
    } else {
      var menuList = getSession('menudata')
      var data = menuList
      // var selectData = Enumerable.from(data)
      //   .where('a=>a.meunId==' + id + '')
      //   .toArray()
      var selectData = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].meunId == id) {
          selectData.push(data[i])
        }
      }

      let accessRoutes = convertRouter(selectData)
      commit('setAllRoutes', accessRoutes)
      return selectData
    }
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
