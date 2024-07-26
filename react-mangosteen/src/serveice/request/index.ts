import axios from "axios"
import type { AxiosInstance } from "axios"
import type { RequestConfig } from "./type"

export class Request {
  instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error: any) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (error: any) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )

    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" })
  }

  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" })
  }

  put<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PUT" })
  }

  head<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "HEAD" })
  }
  
}
