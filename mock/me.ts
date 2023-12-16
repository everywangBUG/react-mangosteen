import type { MockMethod } from 'vite-plugin-mock'
import type { IItems, IResource, IResources, IUser } from '../src/global.d.ts'

export default [
  {
    url: '/api/v1/me',
    method: 'get',
    timeout: 300,
    response: (): IResource<IUser> => {
      return {
        resource: {
          id: 1,
          email: 'frank@frank.com',
          updated_at: '2021-08-01T00:00:00.000Z',
          created_at: '2021-08-01T00:00:00.000Z',
        }
      }
    },
  },
  {
    url: '/api/v1/items',
    method: 'get',
    timeout: 100,
    response: (): IResources<IItems> => {
      return {
        resources: [{
          id: 1,
          user_id: 1,
          amount: 1000,
          tag_ids: [1, 2],
          happen_at: '2021-08-01T00:00:00.000Z',
          created_at: '2021-08-01T00:00:00.000Z',
          updated_at: '2021-08-01T00:00:00.000Z',
          kind: 'expenses',
        }],
        pager: {
          page: 1,
          per_page: 25,
          count: 100
        }
      }
    },
  },
] as MockMethod[]
