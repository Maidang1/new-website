import { Files } from '@/pages/blog'

export const FILE_INFO = new Map<string, Files>()



export const generateFileInfo = async (file: string) => {
  const fs = await import('fs')
  const readingTime = (await import("reading-time")).default
  if (!fs.existsSync(file)) {
    return
  }
  const stat = fs.statSync(file);
  const content = fs.readFileSync(file, 'utf8')
  const readTime = readingTime(content);
  const { text } = readTime;
  const { ctimeMs } = stat
  return { ctimeMs, text }
}