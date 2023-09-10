import { useEffect } from 'react'

export function useTitle(title?: string) {
  if (title === undefined || title === null) {
    return
  }
  useEffect(() => { document.title = title }, [])
}
