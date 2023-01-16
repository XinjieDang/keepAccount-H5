//api/home/home.ts
import request from '../../request/index'
import services from '@/service'
let api = {
  login: (data: any) => {
    return request.post(services.loginUrl, data)
  },
  TypeMenuList: () => {
    return request.get(services.categoryUrl)
  },
}
export default api
