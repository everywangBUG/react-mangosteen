import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['content-Type'] = 'applocation/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) {
    config.headers.Authorization = `Bearer  + ${jwt}`
  }
  return config
})

export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {}
}
