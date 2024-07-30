import { create } from "zustand"
import { FormError } from "../library/validate"

type Data = {
  email: string
  code: string
}

interface LoginStore {
  data: Data
  error: { [key in keyof Data]: any[] }
  setData: (data: Partial<Data>) => void
  setError: (error: FormError<Data>) => void
}

export const useSetLoginData = create<LoginStore>((set) => ({
  data: {
    email: "111",
    code: ""
  },
  error: {
    email: [],
    code: []
  },
  setData: (data) => {
    set((state) => ({ data: { ...state.data, ...data } }))
  },
  setError: (error) => {
    set((state) => ({ error: { ...state.error, ...error } }))
  }
}))