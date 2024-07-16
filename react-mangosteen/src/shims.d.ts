import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    flex?: boolean,
    relative?: boolean
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean
  }
}