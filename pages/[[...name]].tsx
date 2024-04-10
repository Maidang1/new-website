import { GetStaticPaths } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMDXComponents } from '@/mdx-components';
import remarkToc from 'remark-toc';
import { remarkCodeHike } from '@code-hike/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
import remarkGfm from 'remark-gfm';
import { readingTime } from 'reading-time-estimator';
import { PostListContext } from '@/stores/post-list-context';
import { PostItemContext } from '@/stores/post-item-context';
import fm from 'front-matter';

interface HomeProps {
  code: string;
  frontmatter: Record<string, any>;
  postInfo: any[];
}

const Home = (props: HomeProps) => {
  const { code, postInfo, frontmatter } = props;
  const components = useMDXComponents();
  const Component = getMDXComponent(code);
  const { title, author, tags, description, createdAt } = frontmatter;
  return (
    <PostItemContext.Provider value={frontmatter}>
      <PostListContext.Provider value={postInfo}>
        {title && (
          <div className='post-header mb-8'>
            <div className='xlog-post-title mb-8 flex items-center relative text-4xl font-extrabold justify-center text-center'>
              {title}
            </div>
            <div className='text-zinc-400 mt-5 space-x-5 flex items-center justify-center'>
              <span>{new Date(createdAt).toLocaleString()}</span>
              <span>
                {(tags as any[]).map((tag) => (
                  <span key={tag} className='inline-block'>
                    #{tag}
                  </span>
                ))}
              </span>
              <span>{author}</span>
            </div>
            <div className='xlog-post-summary border rounded-xl mt-5 p-4 space-y-2'>
              <div className='text-zinc-500 leading-loose text-sm'>
                {description}
              </div>
            </div>
          </div>
        )}
        <Component components={components} />
      </PostListContext.Provider>
    </PostItemContext.Provider>
  );
};

export default Home;

export const getStaticPaths = (async () => {
  const fs = await import('fs-extra');
  const path = await import('path');
  const postDir = path.join(process.cwd(), 'posts');

  const getFiles = async (dir: string) => {
    const subDirs = await fs.readdir(dir);
    const files = (await Promise.all(
      subDirs.map(async (subDir) => {
        const res = path.resolve(dir, subDir);
        const isDir = (await fs.stat(res)).isDirectory();
        return isDir ? getFiles(res) : res.slice(postDir.length + 1);
      })
    )) as string[];
    return files
      .flat()
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.tsx'));
  };

  function getSegments(file: string) {
    let segments = file.slice(0, -4).replace(/\\/g, '/').split('/');
    if (segments[segments.length - 1] === 'index') {
      segments.pop();
    }
    return segments;
  }
  const files = await getFiles(postDir);
  const paths = files.map((file) => {
    return {
      params: {
        name: getSegments(file),
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

interface ContextProps {
  params: {
    name?: string[];
  };
}

export const getStaticProps = async (context: ContextProps) => {
  const path = await import('path');
  const fs = await import('fs/promises');
  const { bundleMDX } = await import('mdx-bundler');
  const requestPath = (context.params.name || []).join('/') || 'index';
  const postDir = path.join(process.cwd(), 'posts');
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

  const { code, frontmatter } = await bundleMDX({
    source: mdxContext,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkToc,
        [
          remarkCodeHike,
          {
            lineNumbers: true,
            showCopyButton: true,
            theme: 'dark-plus',
            skipLanguages: ['mermaid'],
            autoImport: true,
            autoLink: true,
          },
        ],
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeSlug],
        [
          rehypeToc,
          {
            cssClasses: {
              toc: 'blog-toc',
              list: 'blog-toc-list not-prose',
            },
          },
        ],
      ];
      return options;
    },
  });

  frontmatter.createdAt = new Date(frontmatter.createdAt).getTime();
  const getFiles = async (dir: string) => {
    const subDirs = await fs.readdir(dir);
    const files = (await Promise.all(
      subDirs.map(async (subDir) => {
        const res = path.resolve(dir, subDir);
        const isDir = (await fs.stat(res)).isDirectory();
        return isDir ? getFiles(res) : res.slice(postDir.length + 1);
      })
    )) as string[];
    return files
      .flat()
      .filter(
        (file) =>
          file.endsWith('.mdx') &&
          !(file.startsWith('index.mdx') || file.endsWith('index.mdx'))
      );
  };
  async function getPostListAndPostInfo() {
    const files = await getFiles(postDir);
    const postInfo = await Promise.all(
      files.map(async (fileItem) => {
        const filePath = path.join(postDir, fileItem);
        const content = await fs.readFile(filePath, 'utf8');
        const result = readingTime(content);
        const { attributes } = fm(content);
        const { title } = attributes as any;
        return {
          result,
          name: path.parse(fileItem).name,
          title,
        };
      })
    );
    return postInfo;
  }
  const postInfo = await getPostListAndPostInfo();
  return {
    props: {
      code,
      frontmatter,
      postInfo,
    },
  };
};