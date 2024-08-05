import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { body } from "../main";
import { ShowToast } from "../components/ShowToast";

interface Props {
  message: string
  position: "top" | "middle" | "bottom"
  duration?: number
  type?: "success" | "error" | "info" | "warning"
}

let hasToast = false

export const Toast: React.FC<Props> = (props) => {
  const { message, position, duration = 200, type = "info" } = props
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() =>{
      setVisible(false)
    }, duration)

    return clearTimeout(timer)
  }, [duration])

  const toast = ReactDOM.createPortal(
    <ShowToast visible={visible}>{message}</ShowToast>,
    body
  )

  return toast
}

export const showToast = (props: Props) => {
  const { message, position, duration } = props
  const element = (
    <Toast message={message} position={position} duration={duration} />
  )

  if (hasToast) {
    return
  }

  const container = document.createElement("div")
  document.body.appendChild(container)
  
  const root = createRoot(container)
  root.render(element)
  hasToast = true

  setTimeout(() => {
    root.unmount()
    container.remove()
  }, duration)

  return () => {
    root.unmount()
    container.remove()
  }
}
