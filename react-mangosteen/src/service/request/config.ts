export let BASE_URL = ""
export const HEADERS = ""
if (import.meta.env.PROD) {
  BASE_URL = "https://mangosteen2.hunger-valley.com"
} else {
  BASE_URL = "https://mangosteen2.hunger-valley.com"
}

export default BASE_URL
export const TIME_OUT = 10000
