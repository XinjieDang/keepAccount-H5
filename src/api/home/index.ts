//api/home/home.ts
import request from '../../request/index'
import services from '@/service'
let api = {
  login: (data: any) => {
    return request.post(services.loginUrl, data)
  },
}
export default api
