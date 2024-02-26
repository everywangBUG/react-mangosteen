import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import { Input } from '../../components/Input'
import { useCreateTag } from '../../stores/useCreateTag'
import { hasError, validate } from '../../lib/validate'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const [searchParams] = useSearchParams()
  const { data, error, setData, setError } = useCreateTag()
  useEffect(() => {
    if (type !== 'create') { return }
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind is required')
    }
    if (kind !== 'expenses' && kind !== 'incomes') {
      throw new Error('kind must be "expenses" or "income"')
    }
    setData({ kind })
  }, [searchParams])
  const params = useParams()
  useEffect(() => {
    if (type !== 'edit') { return }
    const id = params.id
    if (!id) {
      throw new Error('id is required')
    }
    // 发送请求
    // setData
  }, [])
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名字必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名字最多四个字符' },
      { key: 'sign', type: 'required', message: '标签图标必填' }
    ])
    setError(newError)
    if (!hasError(newError)) {
      console.log('submit')
    }
  }

  return (
    <form onSubmit={onSubmit} px-16px py-32px text-16px flex flex-col gap-y-8px>
      <Input
        type='text'
        label={'标签名'}
        error={error.name?.[0]}
        value={data.name}
        onChange={name => setData({ name })}
      />
      <Input
        type='emoji'
        label={<span>图标：<span text-24px>{data.sign}</span></span>}
        error={error.sign?.[0]}
        value={data.sign}
        onChange={sign => setData({ sign })}
      />
      <p text-center mb-16px>记账的时候长按即可，可以编辑</p>
      <div text-center>
        <button type="submit" w="90%" j-btn>确定</button>
      </div>
    </form>
  )
}
