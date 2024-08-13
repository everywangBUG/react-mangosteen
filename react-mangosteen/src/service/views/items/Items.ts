import { request } from "../../index";

interface Item {
  page: number
  happen_after?: string
  happen_before?: string
}

interface Tags {
  page: number
  kind: ItemNewKind
}

export function getItems(params: Item): Promise<Resources> {
  return request.get({
    url: "/api/v1/items",
    params
  }, { showLoading: true })
}

export function getTags(params: Tags): Promise<Resources> {
  return request.get({
    url: "/api/v1/tags",
    params
  }, { showLoading: true })
}