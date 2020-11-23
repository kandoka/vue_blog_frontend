import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8081"

/**
 * 前置拦截，拦截request请求
 */
axios.interceptors.request.use(config => {
  return config
})

/**
 * 后置拦截，拦截response请求
 */
axios.interceptors.response.use(response => {//正常响应的流程
    let res = response.data;

    console.log("=================")
    console.log(res)
    console.log("=================")

    if (res.code === 200) {
      return response
    } else {
      //错误信息弹窗
      Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000})
      //reject提前结束响应流程，不往下执行了
      return Promise.reject(response.data.msg)
    }
  },
  error => {//错误响应的流程
    console.log(error)
    if(error.response.data) {//如果这里面有数据
      error.message = error.response.data.msg
    }

    if(error.response.status === 401) {//401则清除用户信息，返回登录界面
      store.commit("REMOVE_INFO")
      router.push("/login")
    }

    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)