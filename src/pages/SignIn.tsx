import { useNavigate } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { useSetLoginData } from '../stores/useSetLoginData'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'

export const SignIn: React.FC = () => {
  const navigator = useNavigate()
  const { data, error, setLoginData, setLoginError } = useSetLoginData()

  const onHandleBack = () => {
    // 返回上一页
    navigator('/items')
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // 两种方式存储登录的邮箱和验证码数据，useState和zustand，第一种刷新过后充重置表单问题，第二种可以解决第一种的问题
    const errorData = validate(data, [
      { key: 'email', type: 'required', message: '邮箱地址不能为空' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '验证码不能为空' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码为6位' }
    ])
    setLoginError(errorData)
    if (!hasError(errorData)) {
      ajax.post('/api/v1/api/session', data)
    }
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
        <Input
          label={'邮箱地址'}
          placeholder={'请输入邮箱，然后点击发送验证码'}
          value={data.email}
          onChange={value => setLoginData({ email: value })}
          error={error.email[0]}
        />
        <div>
          <Input type='sms_code' label={'验证码'} placeholder={'六位数字'} value={data.code} onChange={value => setLoginData({ code: value })} error={error.code?.[0]} />
        </div>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </>
  )
}
