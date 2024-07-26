import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"


export const SignIn: React.FC = () => {
  const onSubmit = () => {}
  
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
          <Input type="email" />
          <Input type="sms_code" />
          <div mt-100px>
            <button w-btn type="submit">登录</button>
          </div>
        </form>
      </div>
    </div>)
}
