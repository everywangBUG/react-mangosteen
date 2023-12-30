import { create } from 'zustand'

interface LoginState {
  email: string
  code: string
}

interface LoginStore {
  data: LoginState
}

export const useSetLoginData = create<LoginStore>((set) => ({
  data: {
    email: '',
    code: '',
  },
  setLoginData: (data: Partial<LoginState>) => {
    set(state => (
      {
        data: {
          ...state.data,
          ...data
        }
      }
    ))
  }
}))
