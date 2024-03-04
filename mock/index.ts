import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'
import { tagsMock } from './tag.mock'

export default [
  ...itemsMock,
  ...meMock,
  ...sessionMock,
  ...tagsMock
] as MockMethod[]
