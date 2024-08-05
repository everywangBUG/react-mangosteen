import axios from "axios"
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import type { RequestConfig } from "./type"
import { Interceptors } from "./type";
import { ErrorUnauthorized } from "../../constants/Error";
import { showToast } from "../../library/Toast";

export class Request {
  instance: AxiosInstance;
  Interceptors?: Interceptors

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    // 设置默认的请求和响应拦截器
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

    // 如果配置中提供了自定义拦截器，则覆盖默认的拦截器
    if (config.interceptors) {
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn
      )
      
      this.instance.interceptors.request.use(
        config.interceptors?.requestSuccessFn,
        config.interceptors?.requestFailureFn
      )
    }
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        if ((res as AxiosError)?.response?.status === 401) {
          throw new ErrorUnauthorized()
        }
        if ((res as AxiosError)?.response?.status === 403) {
          throw new ErrorUnauthorized()
        }
        if ((res as AxiosError)?.response?.status === 404) {
          showToast({
            message: "网络有点问题哦~",
            position: "middle",
            duration: 1000
          })
        }
        if (config.interceptors?.responseSuccessFn && (res as AxiosResponse).status === 200) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  public get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" })
  }

  public post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" })
  }

  public delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" })
  }

  public patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" })
  }

  public put<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PUT" })
  }

  public head<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "HEAD" })
  }
  
}
