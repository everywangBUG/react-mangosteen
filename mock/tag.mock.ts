import type { MockMethod } from 'vite-plugin-mock'
import type { ResponseParams } from './mock'

export const tagsMock: MockMethod = {
  url: '/api/v1/tags',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams): IResources<Tag> => {
    const tags = Array.from({ length: 20 }).map<Tag>((tag, index) => ({
      id: index,
      name: `打车${index}`,
      kind: 'expenses',
      sign: '😀',
      user_id: 1,
      created_at: '2023-03-15 12:00:00',
      happen_at: '2023-03-15 12:00:00',
      updated_at: '2023-03-15 12:00:00',
      deleted_at: null,
    }))
    return {
      resources: tags,
      pager: {
        page: 1,
        per_page: 10,
        count: 20
      }
    }
  }
}
