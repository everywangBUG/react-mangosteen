interface Props {
  visible?: boolean
  children: React.ReactNode
}

export const ShowToast: React.FC<Props> = (props) => {
  const { visible = false, children } = props

  if (!visible) return null

  return (
    <>
      <div fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center flex-col>
        <div w-200px h-200px flex items-center justify-center rounded-16px className={"bg-black:25"} text-white>
          {children}
        </div>
      </div>
    </>
  )
}
