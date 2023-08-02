import { ExtraTitle } from "./extra-title"
import { TagLink } from "./link"
import { BlogItem } from "./blog-item"

export const MDXComponents = {
  ExtraTitle,
  a: TagLink,
  BlogItem,
} as const
for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key]
    MDXComponent.mdxName = key || "any"
  }
}
