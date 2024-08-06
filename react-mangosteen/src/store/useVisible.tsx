import { create } from "zustand"

interface TopMenuStore {
  visible: boolean
  setVisible: () => void
}

export const useVisible = create<TopMenuStore>((set) => ({
  visible: false,
  setVisible: () => set((state) => ({ visible: !state.visible }))
}))