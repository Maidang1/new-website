import { GetStaticPaths } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMDXComponents } from '@/mdx-components';
import remarkToc from 'remark-toc';
import { remarkCodeHike } from '@code-hike/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
interface HomeProps {
  code: string;
  frontmatter: Record<string, any>;
}

const Home = (props: HomeProps) => {
  const { code } = props;
  const components = useMDXComponents();
  const Component = getMDXComponent(code);
  return (
    <div>
      <Component components={components} />
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

  return {
    props: {
      code,
      frontmatter,
    },
  };
};
