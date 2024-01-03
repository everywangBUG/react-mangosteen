import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/api/session',
    method: 'post',
    response: () => {
      return {
        session: '1234567890',
      }
    },
  }
] as MockMethod[]
