import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Toast } from 'antd-mobile'
import service from './service'
import { useNavigate } from 'react-router-dom'
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //给请求头设置token
    config.headers!.Authorization = `Bearer ${
      localStorage.getItem('Authorization') || null
    }`
    return config
  },
  (error: AxiosError) => {
    Toast.show({ content: error.message })
    return Promise.reject(error)
  }
)
/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return data
    } else {
      // 处理业务错误。
      Toast.show({ content: message })
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    const navigate = useNavigate()
    switch (status) {
      case 401:
        message = 'token失效,请重新登录'
        // 这里可以触发退出的 action
        // navigate('/login', {
        //   replace: true,
        // })
        break
      case 403:
        message = '没有权限,请获取权限后登录'
        break
      case 404:
        message = '页面不存在'
        break
      case 500:
        message = '服务器故障'
        break
      case 502:
        message = '数据库查询错误'
        break
      default:
        message = '网络连接错误'
    }
    Toast.show({ content: message })
    return Promise.reject(error)
  }
)

export default service
