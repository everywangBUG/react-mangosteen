import { createRoot } from "react-dom/client"
import s from "styled-components"
import { Icon } from "../components/Icon"
import ReactDOM from "react-dom";

const Loading = s.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 
  svg {
    color: var(--orange);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`

let hasLoading = false
let container: HTMLDivElement | null = null;

export const showLoading = () => {
  
  if (hasLoading) {
    return
  }
  
  if (!container) {
    container = document.createElement("div")
  }
  
  const root = createRoot(container)
  const loading = ReactDOM.createPortal(
    <Loading><Icon name="loading" className={"w-48px h-48px"}/></Loading>,
    document.body
  )

  root.render(loading)
  hasLoading = true

  const cleanup = () => {
    root.unmount();
    container?.remove();
    hasLoading = false;
  };

  return cleanup
}