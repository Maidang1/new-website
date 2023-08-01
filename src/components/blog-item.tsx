interface BlogItemProps {
  children: React.ReactElement
}

export const BlogItem = (props: BlogItemProps) => {
  return (
    <div
      {...props}
      className="flex items-center justify-between py-3 border-t border-base last:border-b
      fg-base hv-base text-black opacity-60 hover:opacity-100 dark:text-white dark:opacity-90 transition-all ease-in"
    ></div>
  )
}
