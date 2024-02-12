import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '../constants/itemErrors'

export const ErrorPage: React.FC = () => {
  const error = useRouteError()
  const e = error as Error
  const loc = useLocation()
  if (e instanceof ErrorUnauthorized) {
    return <Navigate replace to={`/sign_in?from=${loc.pathname}${loc.search}`} />
  } else {
    return (<div>未知的错误</div>)
  }
}
