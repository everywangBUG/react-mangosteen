import { create } from 'zustand'
import type { FormError } from '../lib/validate'

// 如果一个数据类型给自己用，不会扩展类型，使用interface
type LoginState = {
  email: string
  code: string
}

interface LoginStore {
  data: LoginState
  error: FormError<LoginState>
  setLoginData: (data: Partial<LoginState>) => void
  setLoginError: (error: Partial<FormError<LoginState>>) => void
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
  setLoginData: (data: Partial<LoginState>) => {
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
  setLoginError: (error: Partial<FormError<LoginState>>) => {
    set(state => (
      {
        ...state,
        error: {
          ...state.error,
          ...error
        }
      }
    ))
  }
}))
