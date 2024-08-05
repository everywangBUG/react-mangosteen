interface Props {
  visible?: boolean
  children: React.ReactNode
}

export const Popup: React.FC<Props> = (props) => {
  const { visible = false, children } = props
  
  if (!visible) return null
  
  return (
    <>
      <div fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center flex-col className="bg-black:75">{children}</div>
    </>
  )
}
