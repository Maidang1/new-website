import { GetStaticPaths } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMDXComponents } from '@/mdx-components';
import remarkToc from 'remark-toc';
import { remarkCodeHike } from '@code-hike/mdx';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { readingTime } from 'reading-time-estimator';
import { PostListContext } from '@/stores/post-list-context';
import { PostItemContext } from '@/stores/post-item-context';
import fm from 'front-matter';
import remarkNoteBlock from '@/lib/remark-note-block';
import { useRouter } from 'next/router';

interface HomeProps {
  code: string;
  frontmatter: Record<string, any>;
  postInfo: any[];
}

const Home = (props: HomeProps) => {
  const { code, postInfo, frontmatter } = props;
  const components = useMDXComponents();
  const Component = getMDXComponent(code);
  const router = useRouter();
  const isBlogPage = router.asPath.startsWith('/blog') && router.asPath !== '/blog';
  const { title, author, tags, description, createdAt, image } = frontmatter;
  return (
    <div className='overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20 dark:bg-black dark:text-white'>
      {image && (
        <div
          className='h-[400px] w-full'
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <main
        className={`flex m-auto px-8 container mx-auto max-w-5xl prose dark:text-white ${
          isBlogPage ? 'mt-7' : 'mt-[120px]'
        }`}
      >
        <div className='w-full' id='main-content'>
          <PostItemContext.Provider value={frontmatter}>
            <PostListContext.Provider value={postInfo}>
              {title && (
                <div className='post-header mb-8'>
                  <div className='mb-8 flex items-center relative text-4xl font-extrabold justify-center text-center'>
                    {title}
                  </div>
                  <div className='text-zinc-400 flex min-w-0 shrink grow flex-wrap gap-2 text-sm mb-8 justify-center dark:text-white'>
                    <span className='flex min-w-0 items-center space-x-1'>
                      {new Date(createdAt).toLocaleString()}
                    </span>
                    <span className='flex min-w-0 items-center space-x-1'>
                      {(tags as any[]).map((tag) => (
                        <span key={tag} className='inline-block'>
                          #{tag}
                        </span>
                      ))}
                    </span>
                    <span className='flex min-w-0 items-center space-x-1'>
                      {author}
                    </span>
                  </div>
                  <div className='border rounded-xl mt-5 p-4 space-y-2'>
                    <div className='font-bold text-zinc-700 flex items-center dark:text-white'>
                      <span className='i-arcticons-openai-chatgpt mr-2 text-lg'></span>
                      <span>AI Summary</span>
                    </div>
                    <div className='text-zinc-500 leading-loose text-sm dark:text-white'>
                      {description}
                    </div>
                  </div>
                </div>
              )}
              <div className='!text-base'>
                <Component components={components} />
              </div>
            </PostListContext.Provider>
          </PostItemContext.Provider>
        </div>
      </main>
    </div>
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
  const RSS = (await import('rss')).default;
  const feed = new RSS({
    title: "Madinah's blog",
    feed_url: 'http://localhost:3000/feed.xml',
    site_url: 'http://localhost:3000',
  });
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
        remarkDirective,
        remarkNoteBlock,
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
        // [rehypeToc],
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
        const { title, image } = attributes as any;
        feed.item({
          title: title,
          url: '',
          description: '',
          date: '',
        });
        return {
          result,
          name: path.parse(fileItem).name,
          title,
          image,
        };
      })
    );
    return postInfo;
  }

  const postInfo = await getPostListAndPostInfo();
  await fs.writeFile(
    path.join(process.cwd(), 'public', 'feed.xml'),
    feed.xml({ indent: true })
  );
  return {
    props: {
      code,
      frontmatter,
      postInfo,
    },
  };
};
