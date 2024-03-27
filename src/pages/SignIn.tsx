import { useNavigate, useSearchParams } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import type { AxiosError } from 'axios'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { useSetLoginData } from '../stores/useSetLoginData'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import type { FormError } from '../lib/validate'
import { BackIcon } from '../components/BackIcon'

export const SignIn: React.FC = () => {
  const navigator = useNavigate()
  const { data, error, setLoginData, setLoginError } = useSetLoginData()

  const onSubmitError = (err: AxiosError<FormError<typeof data>>) => {
    err.response?.data && setLoginError(err.response.data.errors)
    throw error
  }

  const { post } = useAjax({ showLoading: false })
  const [search] = useSearchParams()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // 两种方式存储登录的邮箱和验证码数据，useState和zustand，第一种刷新过后有重置表单问题，第二种可以解决第一种的问题
    const errorData = validate(data, [
      { key: 'email', type: 'required', message: '邮箱地址不能为空' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '验证码不能为空' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码为6位' }
    ])
    setLoginError(errorData)
    if (!hasError(errorData)) {
      const response = await post<{ jwt: string }>('/api/v1/session', data)
        .catch(onSubmitError)
      const jwt = response.data.jwt
      localStorage.setItem('jwt', jwt)
      // 设置哪里跳过去的路由
      const from = search.get('from') || '/items'
      navigator(from)
    }
  }

  const onHandleSendCode = async () => {
    const errorData = validate(data, [
      { key: 'email', type: 'required', message: '邮箱地址不能为空' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
    ])
    setLoginError(errorData)
    if (hasError(errorData)) { throw new Error('验证码发送失败') }
    const response = await post('/api/v1/validation_codes', {
      email: data.email
    })
    return response
  }

  return (
    <>
      <Gradient>
        <TopNav title='登录' icon={<BackIcon />} />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px text="#7878FF" font-bold>橙子记账</h1>
      </div>
      <form j-form onSubmit={onSubmit}>
        <Input
          label={'邮箱地址'}
          placeholder={'请输入邮箱，然后点击发送验证码'}
          value={data.email}
          onChange={email => setLoginData({ email })}
          error={error.email?.[0]}
        />
        <div>
          <Input
            type='sms_code'
            label={'验证码'}
            placeholder={'六位数字'}
            value={data.code}
            onChange={code => setLoginData({ code })}
            error={error.code?.[0]}
            request={onHandleSendCode}
          />
        </div>
        <div mt-100px>
          <button j-btn type="submit">登录</button>
        </div>
      </form>
    </>
  )
}
