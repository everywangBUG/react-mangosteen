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