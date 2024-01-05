import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    flex?: boolean,
    relative?: boolean
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean,
    w?: string,
    rounded?: string,
    right?: string,
    bottom?: string,
    b?: string,
    'focus:shadow'?: boolean,
    py?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string,
    h?: string
  }
}