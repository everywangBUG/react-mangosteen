import { create } from "zustand"
import { localStorageCache } from "../library/storage"

interface SkipWelcomeState {
  isSkip: boolean
  setIsSkip: (read: string) => void
}

const init = localStorageCache.getStorage("skipWelcome") || "no"

const useSkipWelcome = create<SkipWelcomeState>(set => ({
  isSkip: init === "yes",
  setIsSkip: (read) => {
    const res = read ? "yes" : "no"
    localStorageCache.setStorage("skipWelcome", res)
    set({ isSkip: res === "yes" })
  }
}))

export default useSkipWelcome