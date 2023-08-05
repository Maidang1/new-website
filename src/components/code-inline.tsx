export const CodeInline = (props: any) => {
  return (
    <span
      className="not-prose inline rounded-md no-underline py-1 px-1 bg-gray-300/20 font-normal
        text-code dark:text-code-dark bg-code dark:bg-code-dark text-sm"
      {...props}
    ></span>
  )
}
