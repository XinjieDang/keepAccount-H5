//api/home/home.ts
import request from '../../request/index'
import services from '@/service'
let api = {
  getUserInfo: () => {
    return request.get(services.userInfoUrl)
  },
  updateUserInfo: (data: any) => {
    return request.post(services.updateUserUrl, data)
  },
  fileUpload: (data: any) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    return request.post(services.fileUploadUrl, data, config)
  },
}
export default api
