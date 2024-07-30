import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"
import { postV1Session } from "../service/views/signIn/SginIn"
import { localStorageCache } from "../library/storage"
import { useSetLoginData } from "../store/useSetLoginData"
import { validate, hasError } from "../library/validate";


export const SignIn: React.FC = () => {
  const { data, error, setData, setError } = useSetLoginData()
  const navigate = useNavigate()
  const { email, code } = data
  
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors = validate(data, [
      { key: "email", type: "required", message: "请输入邮箱地址" },
      { key: "email", type: "pattern", regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱地址格式不正确" },
      { key: "code", type: "required", message: "请输入验证码" },
      { key: "code", type: "length", min: 6, max: 6, message: "验证码长度不正确" }
    ])
    setError(errors)
    if (hasError(errors)) return
    const { jwt } = await postV1Session({email, code})
    localStorageCache.setStorage("jwt", jwt)
    navigate("/items")
  }

  return (
    <div>
      <GradientTopNav>
        <TopNav icon={<BackIcon name="back" className="w-24px h-24px" />} title="橙子记账" />
      </GradientTopNav>
      <div pt-40px pb-16px>
        <div text-center>
          <Icon className="w-64px h-64px" name="orange" />
          <h1 text-28px mt-4 font-bold text-orange>橙子记账</h1>  
        </div>
        <form w-form onSubmit={onSubmit}>
          <Input
            type="email"
            value={email}
            onChange={email => setData({ email })}
            label="邮箱地址"
            disabledError={error.email?.[0]} 
          />
          <Input
            type="sms_code"
            value={code}
            onChange={code => setData({ code })}
            label="验证码"
            disabledError={error.code?.[0]} 
          /> 
          <div mt-100px>
            <button w-btn type="submit">登录</button>
          </div>
        </form>
      </div>
    </div>)
}
