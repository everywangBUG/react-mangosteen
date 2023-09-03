import { create } from 'zustand'

interface ILocalStorage {
  isReadWelcome: boolean
  setIsReadWelcome: (read: boolean) => void
}

const init = localStorage.getItem('isReadWelcome')

export const useLocalStorage = create<ILocalStorage>((set) => ({
  isReadWelcome: init === 'yes',
  setIsReadWelcome: (read) => {
    const result = read ? 'yes' : 'no'
    localStorage.setItem('isReadWelcome', result)
    set({ isReadWelcome: result === 'yes' })
  }
}
))
