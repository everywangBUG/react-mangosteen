import axios from "axios"
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import type { interceptorOptions, RequestConfig } from "./type"
import { Interceptors } from "./type";
import { ErrorUnauthorized } from "../../constants/Error";
import { showToast } from "../../library/Toast";
import { showLoading } from "../../library/Loading";

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

  request<T = any>(config: RequestConfig<T>, options: interceptorOptions): Promise<T> {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig)
    }
    const cleanup = showLoading()
    if (options?.showLoading) {
      showLoading()
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
            position: "center",
            type: "error",
            duration: 500
          })
        }
        if (config.interceptors?.responseSuccessFn && (res as AxiosResponse).status === 200) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      }).finally(() => {
        cleanup?.()
      })
    })
  }

  public get<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "GET" }, options = { showLoading: false })
  }

  public post<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "POST" }, options = { showLoading: false })
  }

  public delete<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "DELETE" }, options = { showLoading: false })
  }

  public patch<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "PATCH" }, options = { showLoading: false })
  }

  public put<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "PUT" }, options = { showLoading: false })
  }

  public head<T = any>(config: RequestConfig<T>, options?: interceptorOptions): Promise<T> {
    return this.request({ ...config, method: "HEAD" }, options = { showLoading: false })
  }
  
}
