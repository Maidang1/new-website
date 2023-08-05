import { ExtraTitle } from "./extra-title"
import { TagLink } from "./link"
import { BlogItem } from "./blog-item"
import { CodeInline } from "./code-inline"
import { Blockquote } from "./block-quote"
import { WorkSpacePage } from "./workspace-item"

export const MDXComponents = {
  ExtraTitle,
  a: TagLink,
  BlogItem,
  code: CodeInline,
  blockquote: Blockquote,
  WorkSpacePage,
} as const
for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key]
    MDXComponent.mdxName = key || "any"
  }
}
