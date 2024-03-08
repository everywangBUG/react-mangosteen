import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'
import type { ResponseParams } from './mock.js'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: ({ query }: ResponseParams) => {
    if (query.group_by === 'happen_at') {
      return {
        groups: [
          { happen_at: '2024-03-01', amount: 98000 },
          { happen_at: '2024-03-14', amount: 30000 },
          { happen_at: '2024-03-15', amount: 63500 },
          { happen_at: '2024-03-16', amount: 71000 },
          { happen_at: '2024-03-17', amount: 60000 },
          { happen_at: '2024-03-18', amount: 39700 },
          { happen_at: '2024-03-19', amount: 40000 },
          { happen_at: '2024-03-20', amount: 50260 }
        ],
        total: 900
      }
    } else if (query.group_by === 'tag_id') {
      return {
        groups: Array.from({ length: 10 }).map(_ => ({
          tag_id: 456,
          tag: {
            id: 123,
            user_id: 123,
            name: faker.name.firstName(),
            sign: faker.internet.emoji,
            deleted_at: null,
            created_at: '2023-03-08T00:30:18.609+08:00',
            updated_at: '2023-03-08T00:30:18.609+08:00',
            kind: 'expenses'
          },
          amount: faker.datatype.number()
        })),
        total: faker.datatype.number()
      }
    }
  },
}]
