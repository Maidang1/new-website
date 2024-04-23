import { Text } from "./year";

export const Projects = () => {
  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-title mb-2em font-bold text-center dark:text-white">
        Projects
      </h1>
      <article className="w-full relative">
        <div className="text-center mt-2em mb-1em text-gray-700/60 mb-4 text-base dark:text-white">
          Projects
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1em] no-underline">
          <a
            title="farm-plugin-virtual"
            href="https://github.com/Maidang1/farm-plugin-virtual"
            target="_blank"
            className="flex items-center py-[0.5em] px-[1em] rounded hover:bg-gray-400/10 no-underline dark:hover:bg-[#ffffff1a]"
          >
            <div className="hover w-full dark:text-white">
              <div className="text-lg flex items-center">
                <span>farm-plugin-virtual</span>
                <span className="text-xl opacity-50 hover:opacity-100 i-circum-share-1 ml-2" />
              </div>
              <div className="text-sm opacity-70  hover:opacity-100">
                A Rust plugin for farm
              </div>
            </div>
          </a>
        </div>
      </article>
    </div>
  );
};
