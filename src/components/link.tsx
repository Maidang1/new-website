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

export const TagLink = (props: LinkTagProps) => {
  const { title, href, children } = props
  const icon = title ? iconMap[title] : ""
  const base =
    "flex justify-start items-center mx-1 no-underline transition-colors ease-linear text-black dark:text-white"
  const underline =
    "border-b border-black/20 hover:border-black/60 dark:border-white/20 dark:hover:border-white/60"
  const showUnderLine = title !== "list"
  const extraColor: Record<string, string> = {
    list: "text‑inherit",
  }
  const className = `${base} ${showUnderLine ? underline : ""} ${
    extraColor[title] ?? ""
  }`

  return (
    <span className="inline-block align-middle">
      <Link href={href} className={className}>
        {icon && <span className="mr-1">{icon}</span>}
        <span>{children}</span>
      </Link>
    </span>
  )
}
