import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 300,
    statusCode: 401,
    // response: (): IResource<IUser> => {
    //   return {
    //     resource: {
    //       id: 1,
    //       email: 'frank@frank.com',
    //       updated_at: '2021-08-01T00:00:00.000Z',
    //       created_at: '2021-08-01T00:00:00.000Z',
    //     }
    //   }
    // },
    response: () => {
      return ''
    }
  }
] as MockMethod[]
