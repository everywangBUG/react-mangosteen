import { request } from "../../index";

interface Item {
  page: number
  happen_after?: string
  happen_before?: string
}

export function postItems(data: Item) {
  return request.get({
    url: "/api/v1/items",
    data: {
      ...data
    }
  })
}