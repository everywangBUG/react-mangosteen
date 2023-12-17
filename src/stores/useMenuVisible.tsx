import { create } from 'zustand'

interface MenuState {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useMenuVisible = create<MenuState>((set) => ({
  visible: false,
  setVisible: (visible: boolean) => {
    set({ visible })
  }
})
)
