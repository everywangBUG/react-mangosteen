import { useNavigate } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { useSetLoginData } from '../stores/useSetLoginData'

export const SignIn: React.FC = () => {
  const navigator = useNavigate()
  const { data, setLoginData } = useSetLoginData()

  const onHandleBack = () => {
    // 返回上一页
    navigator('/items')
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // 两种方式存储登录的邮箱和验证码数据，useState和zustand，第一种刷新过后充重置表单问题，第二种可以解决第一种的问题
    console.log('登录', data)
  }

  return (
    <>
      <Gradient>
        <TopNav title='登录' icon={<Icon name="back" className="w-24px h-24px" onClick={onHandleBack}/>} />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px text="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <div>{JSON.stringify(data) }</div>
        <div>
          <span j-form-label>邮箱地址</span>
          <input j-input-text type="text" placeholder='请输入邮箱，然后点击发送验证码' value={data.email} onChange={e => setLoginData({ email: e.target.value })}/>
        </div>
        <div>
          <span j-form-label>验证码</span>
          <div flex gap-x-16px justify-between>
            <input j-input-text type="text" placeholder='六位数字' value={data.code} onChange={e => setLoginData({ code: e.target.value })}/>
            <button j-btn>发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </>
  )
}
