import { useRouteError } from "react-router-dom"

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.log(error, 'placeholder')
  
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>)
}
