//api/home/home.ts
import request from '../../request/index'
import services from '@/service'
let api = {
  getTreeList: () => {
    return request.get(services.treeUrl)
  },
}
export default api
