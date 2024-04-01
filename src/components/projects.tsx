/* eslint-disable @next/next/no-img-element */
export const ProjectPage = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-1 my-6 py-4 border-t ">
        <a
          className="flex items-center gap-4 no-underline"
          href="https://rollup.playground.felixwliu.cn"
        >
          <img
            src="https://avatars.githubusercontent.com/u/12554859"
            alt="icon"
            className="w-14 not-prose m-0 mt-0"
          />
          <div className="flex-1">
            <div className="font-semibold text-sm">Rollup Playground</div>
            <div className="text-sm opacity-50 mt-1">Run rollup in Browser</div>
          </div>
        </a>
      </div>
    </div>
  )
}
