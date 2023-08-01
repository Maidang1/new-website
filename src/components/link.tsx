import { Bytedance, Github, Twitter, TencentQq, Google } from "@icon-park/react"
import Link from "next/link"
import React from "react"

interface LinkTagProps {
  href: string
  title: string
  children: React.ReactElement
}
const iconMap: Record<string, React.ReactElement> = {
  ByteDance: <Bytedance />,
  Github: <Github />,
  Twitter: <Twitter />,
  QQ: <TencentQq />,
  Google: <Google />,
}

export const LinkTag = (props: LinkTagProps) => {
  const { title, href, children } = props
  const icon = title ? iconMap[title] : ""
  return (
    <span className="inline-block align-middle">
      <Link
        href={href}
        className="flex justify-start items-center mx-1 no-underline border-b border-black/20
        hover:border-black/60 transition-colors ease-linear text-black dark:text-white
        dark:border-white/20 dark:hover:border-white/60"
      >
        {icon && <span className="mr-1">{icon}</span>}
        <span>{children}</span>
      </Link>
    </span>
  )
}
