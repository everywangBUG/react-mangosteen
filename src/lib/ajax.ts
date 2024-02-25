import { useNavigate } from 'react-router-dom'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { useContext } from 'react'
import axios from 'axios'
import { LoadingContext } from '../App'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['content-Type'] = 'application/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (config.headers && jwt) {
    config.headers.Authorization = `Bearer  + ${jwt}`
  }
  return config
})

type Options = {
  showLoading?: boolean
  handleError?: boolean
}

export const useAjax = (options?: Options) => {
  const map: Record<string, undefined | (() => void)> = {
    401: () => {
      navigate('/sign_in')
    },
    402: () => {
      alert('请付费')
    },
    403: () => {
      alert('没有权限')
    },
    404: () => {
      alert('未知的错误')
    }
  }
  const { show, hide } = useContext(LoadingContext)
  const showLoading = options?.showLoading ?? false
  const handleError = options?.handleError ?? true
  const navigate = useNavigate()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = map[status] || map.unknown
        fn?.()
      }
    }
    throw error
  }

  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return axios.get<T>(path, config).catch(onError)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return axios.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { hide() }
      })
    },
    patch: () => {},
    delete: () => {}
  }
  return ajax
}
