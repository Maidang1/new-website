interface BlogItemProps {
  children: React.ReactElement
}

export const BlogItem = (props: BlogItemProps) => {
  return (
    <div
      {...props}
      className="flex items-center justify-between py-3 border-t border-base last:border-b fg-base hv-base text-gray-700 hover:text-black"
    ></div>
  )
}
