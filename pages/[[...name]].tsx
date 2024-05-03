import type { GetStaticPaths } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { useMDXComponents } from "@/mdx-components";
import { PostListContext } from "@/stores/post-list-context";
import { useRouter } from "next/router";
import { PageImage } from "../components/page-image";
import { PageHeader } from "../components/page-header";
import { type Dictionary, last } from "lodash";
import type { BlogItem } from "@/utils/post";
import { Waline } from "@/components/comment";
interface HomeProps {
	code: string;
	blogs: Dictionary<BlogItem[]>;
	sortedYears: number[];
	blogsInfoMap: Record<string, BlogItem>;
}
const Home = (props: HomeProps) => {
	const { code, blogs, sortedYears, blogsInfoMap } = props;
	const components = useMDXComponents();
	const Component = getMDXComponent(code);
	const router = useRouter();
	const isBlogPage =
		router.asPath.startsWith("/blog") && router.asPath !== "/blog";
	const isBlogListPage = router.asPath === "/blog";
	const isProjectList = router.asPath === "/projects";
	const requestPath = last(router.asPath.split("/"));
	const blogInfo = blogsInfoMap[requestPath || ""];
	return (
		<div className="overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20 dark:bg-black dark:text-white">
			<PageImage image={blogInfo?.image} />
			<main
				className={`flex m-auto px-8 container mx-auto ${
					isProjectList ? "" : "max-w-5xl prose"
				} dark:text-white ${
					isBlogPage ? "mt-7" : isBlogListPage ? "mt-[80px]" : "mt-[120px]"
				}`}
			>
				<div className="w-full h-full" id="main-content">
					<PostListContext.Provider value={{ blogs, sortedYears }}>
						<PageHeader {...blogInfo} />
						<Component components={components} />
						<section className="mt-4 text-sm leading-loose text-gray-600 dark:text-neutral-400">
							{/* {blogInfo?.lastModifyTime &&
                !Number.isNaN(blogInfo.lastModifyTime) && (
                  <div>
                    最后修改于
                    {new Date(blogInfo.lastModifyTime).toLocaleString()}
                  </div>
                )} */}
							{blogInfo?.author && <div>作者：{blogInfo.author}</div>}
							{isBlogPage && (
								<div className="mt-[100px] not-prose">
									<Waline
										serverURL="https://comment.felixwliu.cn/"
										path={router.asPath}
										dark="html.dark"
									/>
								</div>
							)}
						</section>
					</PostListContext.Provider>
				</div>
			</main>
		</div>
	);
};

export default Home;

export const getStaticPaths = (async () => {
	const path = await import("node:path");
	const postDir = path.join(process.cwd(), "posts");
	const { recursiveReaddir, getSegments } = await import("@/utils/index");
	const files = (await recursiveReaddir(postDir))
		.map((file) => file.slice(postDir.length + 1))
		.filter((file) => file.endsWith(".mdx") || file.endsWith(".tsx"));
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
	const path = await import("node:path");
	const { handleBuildMdx } = await import("@/lib/build-mdx");
	const { getMdxContent } = await import("@/utils/mdx");
	const { getBlogsInfo } = await import("@/utils/post");
	const requestPath = (context.params.name || []).join("/") || "index";
	const postDir = path.join(process.cwd(), "posts");
	const mdxContext = await getMdxContent({ blogDir: postDir, requestPath });
	const { code, frontmatter } = await handleBuildMdx({ mdxContext });
	frontmatter.createTime = new Date(frontmatter.createTime).getTime();
	const { groupBlogs, sortedYears, blogsInfoMap } = await getBlogsInfo(postDir);
	return {
		props: {
			code,
			frontmatter,
			blogs: groupBlogs,
			sortedYears,
			blogsInfoMap,
		},
	};
};
