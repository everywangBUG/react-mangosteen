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
    sign: '😀',
    deleted_at: '2024-10-10T12:00:00.000Z',
    created_at: '2024-10-10T12:00:00.000Z',
    updated_at: '2024-10-10T12:00:00.000Z',
    user_id: createId(),
    name: `${faker.name.firstName()}${faker.name.lastName()}`,
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

export const tagsMock: MockMethod = {
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): IResources<Tag> => {
    // const tags = Array.from({ length: 30 }).map<Tag>((tag, index) => ({
    //   id: index,
    //   name: `打车${index}`,
    //   kind: 'expenses',
    //   sign: '😀',
    //   user_id: 1,
    //   created_at: '2023-03-15 12:00:00',
    //   happen_at: '2023-03-15 12:00:00',
    //   updated_at: '2023-03-15 12:00:00',
    //   deleted_at: null,
    // }))
    // return {
    //   resources: tags,
    //   pager: {
    //     page: 1,
    //     per_page: 10,
    //     count: 20
    //   }
    // }
    return createResponse({ count: 40, perPage: 10, page: parseInt(query.page) || 1 })
  }
}
