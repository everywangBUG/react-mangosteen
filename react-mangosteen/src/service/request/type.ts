import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface Interceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

//对于AxiosRequestConfig配置进行拓展
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
}