import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "virtual:svgsprites"
import "./global.scss"
import "virtual:uno.css"

export const rootDiv = document.getElementById("root")!
export const body = document.body
ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
