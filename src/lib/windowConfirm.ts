export const onDeleteConfirm = (title: string, fn: () => void) => () => {
  const res = window.confirm(title)
  if (res) {
    fn()
  }
}
