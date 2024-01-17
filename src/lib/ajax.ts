import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['content-Type'] = 'applocation/json'
axios.defaults.timeout = 10000

export const ajax = {
  get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
    return axios.get<T>(path, config)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => {},
  delete: () => {}
}
