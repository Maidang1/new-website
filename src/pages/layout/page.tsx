import { Toc } from "@/types"
import { Fragment } from "react"
import LayoutHeader from "./header"

interface PageProps {
  content: string
  toc: Toc[]
}

const Page = ({ content }: PageProps) => {
  return (
    <Fragment>
      <div className="overflow-y-scroll h-screen overflow-x-hidden">
        <LayoutHeader />
        <main className="flex prose m-auto px-8 text-black dark:text-white mt-24">
          <div className="prose" id="main-content">
            {content}
          </div>
        </main>
      </div>
    </Fragment>
  )
}
export default Page
