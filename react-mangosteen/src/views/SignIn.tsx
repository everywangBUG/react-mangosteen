import { ChangeEvent, FormEvent, useState } from "react"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"
import { postV1Session } from "../service/views/signIn/SginIn"
import { localStorageCache } from "../library/storage"


export const SignIn: React.FC = () => {
  const [emailValue, setEmailValue] = useState("")
  const [codeValue, setCodeValue] = useState("")
  
  const handleEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value)
  }

  const handleCodeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCodeValue(event.target.value)
  }
  
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { jwt } = await postV1Session({email: emailValue, code: codeValue})
    localStorageCache.setStorage("jwt", jwt)
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
          <Input type="email" value={emailValue} onInput={handleEmailValue} label="邮箱地址" />
          <Input type="sms_code" value={codeValue} onInput={handleCodeValue} label="验证码" /> 
          <div mt-100px>
            <button w-btn type="submit">登录</button>
          </div>
        </form>
      </div>
    </div>)
}
