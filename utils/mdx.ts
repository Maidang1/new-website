import fs from "node:fs/promises";
import path from "node:path";

interface MdxContentParams {
	blogDir: string;
	requestPath: string;
}
export const getMdxContent = async (params: MdxContentParams) => {
	const { blogDir, requestPath } = params;

	let mdxContext = "";
	try {
		mdxContext = await fs.readFile(
			path.join(blogDir, `${requestPath}.mdx`),
			"utf8",
		);
	} catch {
		try {
			mdxContext = await fs.readFile(
				path.join(blogDir, `${requestPath}`, "index.mdx"),
				"utf8",
			);
		} catch {
			mdxContext = await fs.readFile(
				path.join(blogDir, `${requestPath}`, "index.tsx"),
				"utf8",
			);
		}
	}
	return mdxContext;
};
