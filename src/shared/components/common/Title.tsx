import type React from "react"
import { type TitleProps, TextSize } from "../../types/text.types"

export default function Title({
    as: Tag = 'h1',
    title,
    size = '2xl',
    className=''
}:TitleProps) {
    
  return (
    <Tag className={`text-foreground font-bold ${TextSize[size]} ${className}`}>{title}</Tag>
  )
}