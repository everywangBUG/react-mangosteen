import { useRouteError } from "react-router-dom"

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.log(error, 'placeholder')
  
  return (
    <div h-screen flex flex-col justify-center items-center text-orange>
      <h1 mb-4 text-xl>哎哟!</h1>
      <p mb-4 text-xl>不好意思, 一个未知的错误发生了。</p>
      <p>{error.statusText || error.message}</p>
    </div>)
}
