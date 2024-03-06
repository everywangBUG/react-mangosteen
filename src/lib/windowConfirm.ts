export const onDeleteComfirm = (fn: () => void) => () => {
  const res = window.confirm('是否确定删除？')
  if (res) {
    fn()
  }
}
