import { request } from "../../index";

interface GetItem {
  page?: number
  happen_after?: string
  happen_before?: string
}

interface Tags {
  page: number
  kind: ItemNewKind
}

export function getItems(params: GetItem): Promise<Resources> {
  return request.get({
    url: "/api/v1/items",
    params
  }, { showLoading: true })
}

export function postItems(data: Partial<Item>) {
  return request.post({
    url: "/api/v1/items",
    data
  }, { showLoading: true })
}

export function getTags(params: Tags): Promise<Resources> {
  return request.get({
    url: "/api/v1/tags",
    params
  }, { showLoading: true })
}