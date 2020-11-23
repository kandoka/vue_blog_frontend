import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入element-ui并全局使用
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

//导入axios并全局使用
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
