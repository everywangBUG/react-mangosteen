import create from "zustand"
import { time } from "../library/Time"
import { FormError } from "../library/validate";

type Data = Item

type CreateItem = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItem = create<CreateItem>((set) => ({
  data: {
    kind: "income",
    tag_ids: [],
    happen_at: time().toISOString,
    amount: 0
  },
  error: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: []
  },
  setData: (data: Partial<Data>) => {
    set((state) => ({
      ...state,
      data: {
        ...state.data,
        ...data
      }
    }))
  },
  setError: (error: Partial<FormError<Data>>) => {
    set((state) => ({
      ...state,
      error: {
        ...state.error,
        ...error
      }
    }))
  }
}))