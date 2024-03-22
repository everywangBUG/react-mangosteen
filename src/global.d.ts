import type { EmojiType } from '@faker-js/faker'

declare global {

  var isDev: boolean

  type JSONValue = string | number | boolean | null | { [k: string]: JSONValue } | JSONValue[]

  interface IResources<T> {
    resources: T[]
    pager: {
      page: number
      per_page: number
      count: number
    }
  }

  interface IResource<T> {
    resource?: T
  }

  interface IUser {
    id: number
    email: string
    updated_at: string
    created_at: string
  }

  interface IItems {
    id: number
    user_id: number
    amount: number
    tag_ids: number[]
    happen_at: string
    created_at: string
    updated_at: string
    kind: 'expenses' | 'income'
  }

  type ExpendIncome = 'expenses' | 'income'

  interface Tag {
    id: number
    sign: string | EmojiType[] | undefined
    deleted_at: string | null
    created_at: string
    updated_at: string
    user_id: number
    name: string
    kind: 'expenses' | 'income'
  }

}