import s from "./icon.module.scss"
import c from "classnames"
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const BackIcon: React.FC<Props> = ({ className, name, onClick }) => {
  const navigate = useNavigate()
  const backIcon = () => {
    navigate(-1)
  }
  
  return (
    <svg className={c(s.icon, className)} onClick={backIcon}>
      <use xlinkHref={`#${name}`} />
    </svg>)
}
