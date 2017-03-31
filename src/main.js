// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

/**
 * -------------------------- 学习vux用vuex管理应用的状态 ----------------------
 * 18n是多过语言包的开发模式，目前先不用
 */
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
  modules: {
    // i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
    // headerShow: false,
    // headerTitle: '',
    // footShow: false
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
    // updateheaderShow (state, payload) {
    //   state.headerShow = payload.headerShow
    // },
    // updateheaderTitle (state, payload) {
    //   state.headerTitle = payload.headerTitle
    // },
    // updatefootShow (state, payload) {
    //   state.footShow = payload.footShow
    // }
  },
  // cj如果是其他页面调用必须同时写mutations 和 actions
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
    // updateheaderShow ({commit}, headerShow) {
    //   commit({type: 'updateheaderShow', headerShow: headerShow})
    // },
    // updateheaderTitle ({commit}, headerTitle) {
    //   commit({type: 'updateheaderTitle', headerTitle: headerTitle})
    // },
    // updatefootShow ({commit}, footShow) {
    //   commit({type: 'updatefootShow', footShow: footShow})
    // }
  }
})
sync(store, router)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  /**
   * google的页面统计，暂时用不到，如果需要使用，还要找index.html页面增加统计代码，参加vux说明
   */
  // ga && ga('set', 'page', to.fullPath)
  // ga && ga('send', 'pageview')
})
/**
 * -------------------------- 加载常用公用组件 ----------------------
 * cj 其他组件页面直接引用就行了
 */
import { DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, AjaxPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
