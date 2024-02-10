import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorEmptyData, ErrorUnauthorized } from '../constants/itemErrors'

export const ItemsErrors: React.FC = () => {
  const error = useRouteError()
  const e = error as Error
  const loc = useLocation()
  if (e instanceof ErrorUnauthorized) {
    return <Navigate replace to={`/sign_in?from=${loc.pathname}${loc.search}`} />
  }
  else if (e instanceof ErrorEmptyData) {
    return <Navigate replace to='/home' />
  }
  else {
    return <div>出错了</div>
  }
}
