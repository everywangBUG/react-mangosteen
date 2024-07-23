import { create } from 'zustand'

const init = localStorage.getItem('skipWelcome') || 'no'

const useSkipWelcome = create<{isSkip: boolean, setIsSkip: (read: string) => void}>(set => ({
  isSkip: init === 'yes',
  setIsSkip: (read) => {
    const res = read ? 'yes' : 'no'
    localStorage.setItem('skipWelcome', res)
    set({ isSkip: res === 'yes' })
  }
}))

export default useSkipWelcome