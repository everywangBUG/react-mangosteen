import { Navigate, useRouteError } from 'react-router-dom'
import { errors } from '../constants/itemErrors'

export const ItemsErrors: React.FC = () => {
  const error = useRouteError()
  const e = error as Error
  if (e.message === errors.UNAUTHORIZED) {
    return <Navigate to='/sign_in' />
  }
  else if (e.message === errors.EMPTY_DATA) {
    return <Navigate to='/home' />
  }
  else {
    return <div>出错了</div>
  }
}
