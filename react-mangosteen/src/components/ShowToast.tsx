import { Icon } from "./Icon"

interface Props {
  visible?: boolean
  type?: "success" | "error" | "info" | "warning"
  position: "top" | "center" | "bottom"
  children: React.ReactNode
}

export const ShowToast: React.FC<Props> = (props) => {
  const { visible = false, children, type = "info", position = "center"} = props

  if (!visible) return null

  const renderTypeIcon = () => {
    switch(type) {
    case "info":
      return null
    case "success":
      return <Icon name="success" className={"w-48px h-48px"}/>
    case "error":
      return <Icon name="error" className={"w-48px h-48px"}/>
    case "warning":
      return <Icon name="warning" className={"w-48px h-48px"}/>
    }
  }

  const renderToast = () => {
    switch(position) {
    case "center":
      return (
        <div fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center flex-col> 
          <div w-200px h-200px flex flex-col items-center justify-evenly rounded-16px className={"bg-#4c4c4c"} text-white>
            {renderTypeIcon()}
            {children}
          </div>
        </div>
      )
    }
  }

  return (
    <>{renderToast()}</>
  )
}
