declare var isDev: boolean

export interface IResources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

export interface IResource<T> {
  resource?: T
}

export interface IUser {
  id: number
  email: string
  updated_at: string
  created_at: string
}

export export interface IItems {
  id: number
  user_id: number
  amount: number
  tag_ids: number[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'incomes'
}