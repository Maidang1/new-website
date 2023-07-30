import { remark } from "remark"
import externalLinks from "remark-external-links"
import images from "remark-images"
import html from "remark-html"
import unrWapImages from "remark-unwrap-images"


export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(externalLinks)
    .use(images)
    .use(unrWapImages)
    .use(html)
    .process(markdown)
  return result.toString()
}

export const remarkPlugins = {
  remarkPlugins: [
    externalLinks,
    images,
    unrWapImages,
  ],
}