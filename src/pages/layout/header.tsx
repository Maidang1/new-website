const LayoutHeader = () => {
  const tabs = [
    {
      text: "Blog",
      link: "/post",
    },
    {
      text: "Projects",
      link: "/post",
    },
    {
      text: "Workspace",
      link: "/post",
    },
  ]
  return (
    <div
      className="flex justify-between px-8 py-4 fixed left-0 right-0 border-b border-black/5 bg-white/70 backdrop-blur-xl backdrop-saturate-150
    dark:border-white/50 dark:bg-black/70 dark:text-white"
    >
      <div className="opacity-50 hover:opacity-80">
        <a href="#">MaiDang</a>
      </div>
      <div className="flex">
        {tabs.map((item) => (
          <div
            key={item.text}
            className="mr-4 opacity-50 hover:opacity-80 last:mr-0"
          >
            <a href={item.link} className="">
              {item.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayoutHeader
