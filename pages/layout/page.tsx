import type React from "react";
import { Fragment } from "react";

interface PageLayoutProps {
	children: React.ReactElement;
	isBlogPage: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	return (
		<Fragment>
			<div className="overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20 dark:bg-black dark:text-white">
				<main className="flex m-auto px-8 container mx-auto mt-[120px] max-w-5xl prose dark:text-white">
					<div className="w-full" id="main-content">
						{children}
					</div>
				</main>
			</div>
		</Fragment>
	);
};
export default PageLayout;
