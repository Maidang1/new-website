export const LayoutHeader = () => {
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
    <div className="flex justify-between px-8 py-8">
      <div className="opacity-50 hover:opacity-80">
        <a href="#">MaiDang</a>
      </div>
      <div>
        {tabs.map((item) => (
          <a
            href={item.link}
            key={item.text}
            className="mr-4 opacity-50 hover:opacity-80 last:mr-0"
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  )
}
