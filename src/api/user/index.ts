//api/home/home.ts
import request from '../../request/index'
import services from '@/service'
let api = {
  getUserInfo: () => {
    return request.get(services.userInfoUrl)
  },
}
export default api
