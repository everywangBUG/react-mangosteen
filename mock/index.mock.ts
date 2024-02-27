import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { tagsMock } from './tag.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'

export default [
  itemsMock,
  tagsMock,
  meMock,
  sessionMock
] as MockMethod[]
