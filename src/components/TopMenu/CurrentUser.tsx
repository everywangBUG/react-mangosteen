interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (<div className={className} bg="#5C33BE" text-white w="100%" px-16px h-88px flex flex-col justify-center>
    <h2 text-24px>未登录用户</h2>
    <div text="#CEA1FF" mt-10px>点击这里登录</div>
  </div>)
}
