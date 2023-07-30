export const H1 = ({ children }: any) => {
  return (
    <h1 className="text-2xl font-bold mt-6 mb-4 dark:text-white">{children}</h1>
  )
}

export const MDXComponents = {
  h1: H1,
} as const
for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key]
    MDXComponent.mdxName = key
  }
}
