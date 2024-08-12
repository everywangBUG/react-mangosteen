import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ShowToast } from "../components/ShowToast";

interface Props {
  message: string
  position: "top" | "center" | "bottom"
  duration?: number
  type?: "success" | "error" | "info" | "warning"
}

let hasToast = false
let container: HTMLDivElement | null = null;

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
    <ShowToast visible={visible} position={position} type={type}>{message}</ShowToast>,
    document.body
  )

  return toast
}

export const showToast = (props: Props) => {
  const { message, position, duration, type } = props

  if (hasToast) {
    return
  }

  if (!container) {
    container = document.createElement("div")
  }

  const root = createRoot(container)
  root.render(<Toast message={message} position={position} duration={duration} type={type}/>)
  hasToast = true
  

  const cleanup = () => {
    root.unmount();
    container?.remove();
    hasToast = false;
  };

  setTimeout(cleanup , duration)

  return cleanup
}
