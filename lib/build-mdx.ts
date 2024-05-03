import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkDirective from "remark-directive";
import remarkNoteBlock from "@/lib/remark-note-block";
import { remarkCodeHike } from "@code-hike/mdx";
import rehypeSlug from "rehype-slug";

interface BuildMdxParams {
	mdxContext: string;
}

export const handleBuildMdx = async (params: BuildMdxParams) => {
	const { mdxContext } = params;

	const { bundleMDX } = await import("mdx-bundler");

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
						theme: "dark-plus",
						skipLanguages: ["mermaid"],
						autoImport: true,
						autoLink: true,
					},
				],
			];
			options.rehypePlugins = [...(options.rehypePlugins ?? []), [rehypeSlug]];
			return options;
		},
	});

	return { code, frontmatter };
};
