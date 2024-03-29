import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { FormEventHandler } from 'react'
import type { AxiosError } from 'axios'
import useSWR from 'swr'
import { Input } from '../../components/Input'
import { useCreateTag } from '../../stores/useCreateTag'
import type { FormError } from '../../lib/validate'
import { hasError, validate } from '../../lib/validate'
import { useAjax } from '../../lib/ajax'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const { post, get, patch } = useAjax({ showLoading: true })
  const [searchParams] = useSearchParams()
  const { data, error, setData, setError } = useCreateTag()
  const kind = searchParams.get('kind') ?? ''
  useEffect(() => {
    if (type !== 'create') { return }
    if (!kind) {
      throw new Error('kind is required')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind must be "expenses" or "income"')
    }
    setData({ kind })
  }, [searchParams])
  const params = useParams()
  const id = params.id

  const { data: tag } = useSWR(id ? `/api/v1/tags/${id}` : null, async (path) =>
    (await get<IResources<Tag>>(path)).data.resources
  )

  useEffect(() => {
    if (tag) {
      setData(tag)
    }
  }, [tag])

  const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
    if (error.response) {
      const { status } = error.response
      if (status === 422) {
        const { errors } = error.response.data
        setError(errors)
      }
    }
    throw error
  }

  const nav = useNavigate()
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '标签类型必填' },
      { key: 'name', type: 'required', message: '标签名字必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名字最多四个字符' },
      { key: 'sign', type: 'required', message: '标签图标必填' }
    ])
    setError(newError)
    if (!hasError(newError)) {
      if (type === 'create') {
        const response = await post<IResources<Tag>>('/api/v1/tags', data).catch(onSubmitError)
        setData(response.data.resource)
      } else {
        const response = await patch<IResources<Tag>>(`/api/v1/tags/${id}`, data).catch(onSubmitError)
        setData(response.data.resource)
      }
      nav(`/items/new?kind=${kind}`)
    }
  }

  return (
    <form onSubmit={onSubmit} px-16px py-32px text-16px flex flex-col gap-y-8px>
      <Input
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
      <p text-center mb-16px>记账的时候长按即可以编辑</p>
      <div text-center>
        <button type="submit" w="90%" j-btn>确定</button>
      </div>
    </form>
  )
}
