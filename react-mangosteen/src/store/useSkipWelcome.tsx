import { create } from "zustand"

interface SkipWelcomeState {
  isSkip: boolean
  setIsSkip: (read: string) => void
}

const init = localStorage.getItem("skipWelcome") || "no"

const useSkipWelcome = create<SkipWelcomeState>(set => ({
  isSkip: init === "yes",
  setIsSkip: (read) => {
    const res = read ? "yes" : "no"
    localStorage.setItem("skipWelcome", res)
    set({ isSkip: res === "yes" })
  }
}))

export default useSkipWelcome