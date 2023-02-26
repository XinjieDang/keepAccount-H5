//api/index.ts
import home from './home'
import user from './user'
let api = {
  home: { ...home },
  user: { ...user },
}

export default api
