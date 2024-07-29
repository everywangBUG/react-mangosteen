import { BASE_URL, TIME_OUT } from "./request/config"
import { Request } from "./request/index"

export const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
    requestFailureFn: (err) => {
      return err
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn: (err) => {
      return err
    }
  }
})