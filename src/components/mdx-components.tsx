import { ExtraTitle } from "./extra-title"
import { LinkTag } from "./link"

export const MDXComponents = {
  ExtraTitle,
  a: LinkTag,
} as const
for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key]
    MDXComponent.mdxName = key
  }
}
