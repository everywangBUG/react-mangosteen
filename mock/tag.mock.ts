import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'
import type { ResponseParams } from './mock'

let id = 0
const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<Tag>): Tag => {
  return {
    id: createId(),
    sign: faker.internet.emoji,
    deleted_at: '2024-10-10T12:00:00.000Z',
    created_at: '2024-10-10T12:00:00.000Z',
    updated_at: '2024-10-10T12:00:00.000Z',
    user_id: createId(),
    name: `${faker.name.firstName()}`,
    kind: 'expenses',
    ...attrs
  }
}

const createList = (n: number, attrs?: Partial<Tag>): Tag[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Tag>): IResources<Tag> => {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount
  return {
    resources: left > 0 ? createList(Math.min(left, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}

export const tagsMock: MockMethod[] = [{
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): IResources<Tag> => {
    return createResponse({ count: 54, perPage: 10, page: parseInt(query.page) || 1 })
  }
},
{
  url: '/api/v1/tags',
  method: 'post',
  statusCode: 200,
  response: () => {
    return {
      errors: { name: ['不合法的输入'] }
    }
    // return {
    //   kind: 'expense',
    //   id: 1
    // }
  }
},
{
  url: '/api/v1/tags/:id',
  method: 'get',
  statusCode: 200,
  response: () => {
    return {
      resource: create()
    }
  }
},
{
  url: '/api/v1/tags/:id',
  method: 'patch',
  statusCode: 200,
  response: () => {
    return {
      resource: '操作成功'
    }
  }
},
{
  url: '/api/v1/tags/:id',
  method: 'delete',
  statusCode: 200,
  response: () => {
    return {
      resource: '操作成功'
    }
  }
}]
