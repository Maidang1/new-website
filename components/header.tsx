import { ReactNode } from "react";

type HeadingProps = {
	id?: string;
	children?: ReactNode;
};

export const heading = (As: "h1" | `h2` | `h3` | `h4` | `h5` | `h6`) => {
	const Heading = ({ id, children }: HeadingProps) => (
		<a href={`#${id}`} className="group relative no-underline ">
			<As id={id} className="dark:text-white">
				{children}
			</As>
		</a>
	);
	Heading.displayName = As;
	return Heading;
};
