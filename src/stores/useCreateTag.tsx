import { create } from 'zustand'
import type { FormError } from '../lib/validate'

interface CreateRag {
  data: Partial<Tag>
  error: FormError<Tag>
  setData: (data: Partial<Tag>) => void
  setError: (error: Partial<FormError<Tag>>) => void
}

export const useCreateTag = create<CreateRag>((set) => ({
  data: {
    kind: 'expenses',
    sign: '😀',
    name: '',
  },
  error: {
    kind: [],
    sign: [],
    name: [],
  },
  setData: (data: Partial<Tag>) => {
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
  setError: (error: Partial<FormError<Tag>>) => {
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
