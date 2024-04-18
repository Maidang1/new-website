import fs from "fs/promises"
import path from 'path'
import { readingTime } from 'reading-time-estimator';
import fm from 'front-matter';

export interface FrontMatter {
  title: string;
  author: string;
  description: string;
  tags: string[]
  createdAt: number | string
  image: string
}

export async function getPostListAndPostInfo(postDir: string) {
  const { recursiveReaddir } = await import('@/utils/index');
  const files = (await recursiveReaddir(postDir))
    .map((file) => file.slice(postDir.length + 1))
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.tsx'))
    .filter((file) => !file.includes('index'));
  const postInfo = await Promise.all(
    files.map(async (fileItem) => {
      const filePath = path.join(postDir, fileItem);
      const content = await fs.readFile(filePath, 'utf8');
      const readingInfo = readingTime(content);
      const { attributes } = fm<Partial<FrontMatter>>(content);
      const { title = '', image = '' } = attributes;
      return {
        readingInfo,
        name: path.parse(fileItem).name,
        title,
        image,
      } as const;
    })
  );
  return postInfo;
}