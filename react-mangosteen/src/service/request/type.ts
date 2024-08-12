import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export interface Interceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

//对于AxiosRequestConfig配置进行拓展
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
}

export interface interceptorOptions {
  showLoading?: boolean
  showError?: boolean
}