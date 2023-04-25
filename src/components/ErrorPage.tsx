import { useRouteError } from 'react-router-dom'

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()

  return (
    <div id="error-page">
      <h1>哎呦喂!</h1>
      <p>抱歉，一个未知的错误发生了！</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
