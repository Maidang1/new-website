export const Blockquote = (props: any) => {
  // 这里去掉 mdx 传过来的 p 标签 只留下里面的内容
  const [_, p, __] = props.children
  const text = p.props || {}

  return (
    <blockquote
      {...text}
      className="prose font-normal not-italic text-sm text-black opacity-70 dark:text-white"
    ></blockquote>
  )
}
