import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 45000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.log('request response', response)
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 0) {
      // -2:非法的token;
      if (res.code === -2) {
        let tiMsg = res.code === -2 ? '您已被登出' : '登录超时'
        MessageBox.confirm(
          tiMsg + '，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/fedLogOut').then(() => {
            router.replace({ path: '/login' })
            //location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          return
        })
      } else {
        Message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error) {
      if (error.response && error.response.status && error.response.status === 403) {
        MessageBox.confirm(
          '登录超时，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/FedLogOut').then(() => {
            router.replace({ path: '/login' })
            //location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          return
        })
      } else if (error.message) {
        Message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service
