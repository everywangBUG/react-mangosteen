import s from "./icon.module.scss"
import c from "classnames"
import React from "react";

interface Props {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Props> = ({ className, name, onClick }) => {
  return (
    <svg className={c(s.icon, className)} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>)
}
