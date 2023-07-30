import { Toc } from "@/types"
import { Fragment } from "react"
import { LayoutHeader } from "./header"

interface PageProps {
  content: string
  toc: Toc[]
}

export const Page = ({ content }: PageProps) => {
  return (
    <Fragment>
      <LayoutHeader />
      <main className="flex prose m-auto px-8 text-black dark:text-white">
        <div>{content}</div>
      </main>
    </Fragment>
  )
}
