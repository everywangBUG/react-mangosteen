import { create } from 'zustand'
import type { FormError } from '../lib/validate'

// 如果一个数据类型给自己用，不会扩展类型，使用interface
type Data = {
  email: string
  code: string
}

interface LoginStore {
  data: Data
  error: FormError<Data>
  setLoginData: (data: Partial<Data>) => void
  setLoginError: (error: Partial<FormError<Data>>) => void
}

export const useSetLoginData = create<LoginStore>((set) => ({
  data: {
    email: '',
    code: '',
  },
  error: {
    email: [],
    code: [],
  },
  setLoginData: (data: Partial<Data>) => {
    set(state => (
      {
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }
    ))
  },
  setLoginError: (error: Partial<FormError<Data>>) => {
    set(state => (
      {
        ...state,
        error: {
          ...error
        }
      }
    ))
  }
}))
