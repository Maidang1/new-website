export const FILE_INFO = new WeakMap()



export const generateFileInfo = async (file: string) => {
  const fs = await import('fs')
  if (!fs.existsSync(file)) {
    return
  }
  const stat = fs.statSync(file);
  const { ctimeMs } = stat
  return { ctimeMs }
}