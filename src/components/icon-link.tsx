import { Bytedance } from "@icon-park/react"
import Link from "next/link"

const iconMap = {
  ByteDance: <Bytedance />,
}

interface IconLinkProps {
  iconName?: keyof typeof iconMap
  href: string
  children: string
}
export const IconLink = (props: IconLinkProps) => {
  const { iconName, href, children } = props
  const icon = iconName ? iconMap[iconName] : ""
  return (
    <Link
      href={href}
      className="flex justify-start items-center mx-2 no-underline border-b border-black/20 hover:border-black/60 transition-colors ease-linear text-black"
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span>{children}</span>
    </Link>
  )
}
