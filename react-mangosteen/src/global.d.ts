type JSONValue = string | number | boolean | null | { [k: string | number]: JSONValue } | JSONValue[]

type Resource<T> = {
  resource: T
}

type User = {
  created_at: string
  updated_at: string
  email: string
  id: number
  name: string | null
}

type Resources<T = any> = {
  resources?: T[]
  pager: {
    count: number
    page: number
    per_page: number
  }
}

type ItemsResources = {
  resources: Item[]
  pager: {
    count: number
    page: string
    per_page: number
  }
}

type Item = {
  amount: number
  created_at: string
  deleted_at: string
  happen_at: string
  happened_at: string
  id: number
  kind: "expense" | "income"
  note: string | null
  tag_ids: number[]
  tags: Tags[]
  user_id: number
}

type Tags = {
  amount: number
  created_at: string
  deleted_at: string
  updated_at: string
  id: number
  name: string
  sign: string
  user_id: number
  kind: "expense" | "income"
}

type ItemNewKind = "expenses" | "income"

