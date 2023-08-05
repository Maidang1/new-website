/* eslint-disable @next/next/no-img-element */
export const WorkSpacePage = () => {
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-1 my-6 py-4 border-t ">
        <div className="font-semibold">Coding</div>
        <div className="flex items-center gap-4">
          <img
            src="https://images.maidang.link/VS%20Code.3e7fce44.png"
            alt="icon"
            className="w-14 not-prose m-0 mt-0"
          />
          <div className="flex-1">
            <div className="font-semibold text-sm">VS Code</div>
            <div className="text-sm opacity-50 mt-1">Code editing. Redefined.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
