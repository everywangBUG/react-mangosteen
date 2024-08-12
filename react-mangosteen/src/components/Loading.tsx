import s from "styled-components"
import { Icon } from "../components/Icon"
import ReactDOM from "react-dom";

const LoadingWrapper = s.div`
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

export const Loading: React.FC = () => {
  return (
    <LoadingWrapper><Icon name="loading" className={"w-48px h-48px"}/></LoadingWrapper>
  )
}
