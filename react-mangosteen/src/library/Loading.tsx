import { createRoot } from "react-dom/client"
import ReactDOM from "react-dom";
import { Loading } from "../components/Loading";

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
  const loading = ReactDOM.createPortal(<Loading />, document.body)
  root.render(loading)

  hasLoading = true

  const cleanup = () => {
    root.unmount();
    container?.remove();
    hasLoading = false;
  };

  return cleanup
}