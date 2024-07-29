import { request } from "../../index"

interface Session {
  code: string;
  email: string;
}

export function postV1Session(data: Session) {
  return request.post({
    url: "/api/v1/session",
    data: {
      ...data
    }
  })
}