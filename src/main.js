import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入element-ui并全局使用
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

//导入axios并全局使用
import axios from 'axios'
Vue.prototype.$axios = axios
import "./axios"  //导入前置拦截和后置拦截的配置axios.js

//导入并全局注册富文本编辑器mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//导入权限验证模块
import "./permission"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
