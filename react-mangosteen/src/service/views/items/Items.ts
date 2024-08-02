import { request } from "../../index";

interface Item {
  page: number
  happen_after?: string
  happen_before?: string
}

export function getItems(params: Item): Promise<Resources> {
  return request.get({
    url: "/api/v1/items",
    params
  })
}