//第一种方式：手动设定
// export const BASE_URL = 'http://codercba.com:9002'
// export const TIME_OUT = 10000

//第二种方式：依赖当前的环境：development/production，依据vite默认配置生产环境和开发环境
export let BASE_URL = ""
export const HEADERS = ""
// console.log(import.meta.env.PROD) // 生产环境
// console.log(import.meta.env.DEV) // 开发环境
if (import.meta.env.PROD) {
  BASE_URL = "http://123.207.32.32:5000"
} else {
  BASE_URL = "http://123.207.32.32:5000"
}

export default BASE_URL
export const TIME_OUT = 10000

// 第三种方式：通过.env文件创建变量
// console.log(import.meta.env.VITE_URL)
// console.log(import.meta.env.VITE_BASE_URL)