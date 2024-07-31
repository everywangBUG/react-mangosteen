import { JSONValue } from "../global"


interface Data {
  [k: string | number]: JSONValue
}

type Rule<T> = {
  key: keyof T
  message: string
} & (
  { type: "required" } |
  { type: "chinese" } |
  { type: "pattern", regex: RegExp } |
  { type: "length", min?: number, max?: number } |
  { type: "notEqual", value: JSONValue }
)

type Rules<T> = Rule<T>[]

type FormError<T> = {
  [k in keyof T]?: string[]
}

export type { Data, Rule, Rules, FormError }

export function isEmpty(value: undefined | JSONValue | Data) {
  return value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)
}

export const validate = <T extends Data>(formData: T, rules: Rules<T>): FormError<T> => {
  const error: FormError<T> = {}
  rules.forEach(rule => {
    const { key, message, type } = rule
    const value = formData[key]
    switch(type) {
      case "required":
        if (isEmpty(value)) {
          error[key] = error[key] ?? []
          error[key].push(message)
        }
        break
      case "pattern":
        if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
          error[key] = error[key] ?? []
          error[key].push(message)
        }
        break
      case "length":
        if (!isEmpty(value)) {
          if (rule.min && value!.toString().length < rule.min) {
            error[key] = error[key] ?? []
            error[key].push(message)
          }
          if (rule.max && value!.toString().length > rule.max) {
            error[key] = error[key] ?? []
            error[key].push(message)
          }
        }
        break
      case "chinese":
        if (!isEmpty(value) && !/^[\u4e00-\u9fa5]+$/.test(value!.toString())) {
          error[key] = error[key] ?? []
          error[key].push(message)
        }
        break
      case "notEqual":
        if (!isEmpty(value) && value === rule.value) {
          error[key] = error[key] ?? []
          error[key].push(message)
        }
    }
  })
  return error
}

export function hasError(errors?: Record<string, string[]>) {
  if (!errors) return false
  let res = false
  for (const key in errors) {
    if (errors[key].length > 0) {
      res = true
      break
    }
  }
  return res
}