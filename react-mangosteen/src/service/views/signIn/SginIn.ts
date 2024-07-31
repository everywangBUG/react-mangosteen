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

export function postSendCode(email: string) {
  return request.post({
    url: "/api/v1/validation_codes",
    data: {
      email
    }
  })
}