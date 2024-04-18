import { GetStaticPaths } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMDXComponents } from '@/mdx-components';
import { PostInfoItem, PostListContext } from '@/stores/post-list-context';
import { PostItemContext } from '@/stores/post-item-context';
import { useRouter } from 'next/router';
import { PageImage } from './page/page-image';
import { PageHeader, type PageHeaderProps } from './page/page-header';
interface HomeProps {
  code: string;
  frontmatter: PageHeaderProps;
  postInfo: PostInfoItem[];
}
const Home = (props: HomeProps) => {
  const { code, postInfo, frontmatter } = props;
  const components = useMDXComponents();
  const Component = getMDXComponent(code);
  const router = useRouter();
  const isBlogPage =
    router.asPath.startsWith('/blog') && router.asPath !== '/blog';
  return (
    <div className='overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20 dark:bg-black dark:text-white'>
      <PageImage image={frontmatter.image} />
      <main
        className={`flex m-auto px-8 container mx-auto max-w-5xl prose dark:text-white ${
          isBlogPage ? 'mt-7' : 'mt-[120px]'
        }`}
      >
        <div className='w-full' id='main-content'>
          <PostItemContext.Provider value={frontmatter}>
            <PostListContext.Provider value={postInfo}>
              <PageHeader {...frontmatter} />
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
  const path = await import('path');
  const postDir = path.join(process.cwd(), 'posts');
  const { recursiveReaddir, getSegments } = await import('@/utils/index');
  const files = (await recursiveReaddir(postDir))
    .map((file) => file.slice(postDir.length + 1))
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.tsx'));
  const paths = files.map((file) => ({
    params: {
      name: getSegments(file),
    },
  }));

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
  const { handleBuildMdx } = await import('@/lib/build-mdx');
  const { getMdxContent } = await import('@/utils/mdx');
  const { getPostListAndPostInfo } = await import('@/utils/post');
  const requestPath = (context.params.name || []).join('/') || 'index';
  const postDir = path.join(process.cwd(), 'posts');
  const mdxContext = await getMdxContent({ postDir, requestPath });
  const { code, frontmatter } = await handleBuildMdx({ mdxContext });
  frontmatter.createdAt = new Date(frontmatter.createdAt).getTime();
  const postInfo = await getPostListAndPostInfo(postDir);
  return {
    props: {
      code,
      frontmatter,
      postInfo,
    },
  };
};
