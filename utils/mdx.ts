import fs from "fs/promises"
import path from 'path'

interface MdxContentParams {
  postDir: string,
  requestPath: string
}
export const getMdxContent = async (params: MdxContentParams) => {
  const { postDir, requestPath } = params;

  let mdxContext = '';
  try {
    mdxContext = await fs.readFile(
      path.join(postDir, `${requestPath}.mdx`),
      'utf8'
    );
  } catch {
    try {
      mdxContext = await fs.readFile(
        path.join(postDir, `${requestPath}`, 'index.mdx'),
        'utf8'
      );
    } catch {
      mdxContext = await fs.readFile(
        path.join(postDir, `${requestPath}`, 'index.tsx'),
        'utf8'
      );
    }
  }
  return mdxContext
}