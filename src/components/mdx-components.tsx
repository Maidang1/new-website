import { ExtraTitle } from "./extra-title"
import { IconLink } from "./icon-link"

export const MDXComponents = {
  ExtraTitle,
  IconLink,
} as const
for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key]
    MDXComponent.mdxName = key
  }
}
