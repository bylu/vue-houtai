// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'
// css
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import Router from 'vue-router'
import { Notification, MessageBox,Loading } from 'element-ui'
import $ from 'jquery'
import store from './store'
import md5 from 'js-md5'
//import dycCommon from 'dyc-common'//引入公用库  暂时注释 使用本地自己添加的过滤器
import selectList from './dict/selectList.js';//引入下拉列表
import dict from './dict/dict.js';//引入字典
import pcModal from './common/pcModal.vue';//引入PC弹框组件
import comMask from './common/comMask.vue';//引入遮罩层组件
import Moment from 'moment'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import commonJs from '@/commonJs/util.js'
import api from './api/api'
Vue.prototype.$api = api;
Vue.use(ElementUI)

Vue.prototype.$md5 = md5
Vue.prototype.$store=store
Vue.config.productionTip = false;
Vue.prototype.$loading=Loading
Vue.prototype.$messageBox=MessageBox
Vue.prototype.moment=Moment

Vue.prototype.commonJs=commonJs //公用方法的封装

Vue.component("pcModal", pcModal);//全局注册PC弹框组件
Vue.component("comMask", comMask);//全局注册遮罩层组件
Vue.prototype.selectList = selectList;//下拉列表挂载到Vue变量
//let dictAndFilter = Object.assign(dict, dycCommon.filter);
let dictAndFilter=Object.assign(dict);
//全局注册字典和过滤器
for (let name in dictAndFilter) {
    Vue.filter(name, dictAndFilter[name])
};
//window.common = {...dycCommon.filter,...dycCommon.common,...dycCommon.verification};
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import {hasBtnPermission} from './assets/js/permission' //按钮权限
Vue.prototype.hasPerm=hasBtnPermission;

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

//路由拦截器
router.beforeEach((to, from, next) => {
  //debugger
  NProgress.start()
 if(whiteList.includes(to.path) || !to.matched.length){ //白名单与不匹配任何路由的 直接跳转
   next();
 }else if (to.path != '/login') {
   if(to.matched.length === 0){
      form.name ? next({
        name:form.name
      }):next('/')
   }else{
    let getToken=sessionStorage.getItem('token');
    if (!undefined == getToken || '' ==getToken || getToken == null) {
      next({
        path: '/login'
      })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
   }
 } else {
   next()
 }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

//页面权限拦截
Vue.directive('has', {
  inserted: function (el, binding) {
    if (!permissionJudge(binding.value)) {
      if(!el.parentNode){
        el.style.display="none"
      }else{
        el.parentNode.removeChild(el);
      }
    }

    function permissionJudge(value) {
      // 此处store.getters.getMenuBtnList代表vuex中储存的按钮菜单数据
      let list = JSON.parse(localStorage.getItem('userMenu'));
      for (let item1 of list) {
        for(let item2 of item1.children){
            for(let item3 of item2.children){
              // if(item3.alias===value){
              //   return true;
              // }
              if(value.indexOf(item3.alias) != -1){
                return true
              }
            }
        }
      }
      return false;
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

