import fs from "fs/promises"
import path from 'path'
import { readingTime } from 'reading-time-estimator';
import fm from 'front-matter';
import { groupBy, uniq } from 'lodash'

export interface FrontMatter {
  title: string;
  author: string;
  description: string;
  tags: string[]
  createTime: number | string
  image: string
  category: string
}


export interface BlogItem {
  title: string
  author: string
  description: string;
  tags: string[]
  createTime: string
  lastModifyTime: number
  image?: string
  readingTime: ReturnType<typeof import("reading-time-estimator").readingTime>
  year: number,
  name: string
  category: string
}



export async function getBlogsInfo(postDir: string) {
  const { recursiveReaddir } = await import('@/utils/index');
  const { getGitTimestamp } = await import("@/utils/timestamp")
  const blogsInfoMap: Record<string, BlogItem> = {}
  const files = (await recursiveReaddir(postDir))
    .map((file) => file.slice(postDir.length + 1))
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.tsx'))
    .filter((file) => !file.includes('index'));

  const allYears: number[] = []
  const blogs = await Promise.all(
    files.map(async (fileItem) => {
      const filePath = path.join(postDir, fileItem);
      const content = await fs.readFile(filePath, 'utf8');
      const lastModifyTime = await getGitTimestamp(filePath);
      const { attributes } = fm<Partial<FrontMatter>>(content);
      const { title = '', image = '', author, createTime = '', description, tags = [], category = '' } = attributes;
      const year = new Date(createTime).getFullYear();
      allYears.push(year)
      const blogRequestPath = path.parse(filePath).name
      const blogItemInfo = {
        title,
        image,
        readingTime: readingTime(content),
        lastModifyTime,
        author,
        createTime: String(createTime),
        description,
        tags,
        year,
        name: blogRequestPath,
        category
      } as BlogItem;
      blogsInfoMap[blogRequestPath] = blogItemInfo;
      return blogItemInfo;
    })
  );
  const groupBlogs = groupBy(blogs, 'year')
  const sortedYears = uniq(allYears).sort((a, b) => b - a)
  return { groupBlogs, sortedYears, blogsInfoMap };
}