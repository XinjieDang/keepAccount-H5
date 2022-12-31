//services.ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'
const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})
export default service
