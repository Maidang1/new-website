import { Text } from './year';
import { keys } from 'lodash';

export const Projects = () => {
  const projectList = {
    Farm: [
      {
        link: 'https://github.com/Maidang1/farm-plugin-virtual',
        title: 'farm-plugin-virtual',
        description: 'Rust plugin for farm to easily use virtual module',
        Icon: () => <span className='i-fluent-emoji-flat-cookie'></span>,
      },
    ],
    Solid: [
      {
        link: 'https://github.com/Maidang1/solid-js-template',
        title: 'solid-js-template',
        description: 'Template for solid-js',
        Icon: () => (
          <span className='i-fluent-emoji-flat-artist-palette'></span>
        ),
      },
    ],
    Rollup: [
      {
        link: 'https://github.com/Maidang1/rollup-playground',
        title: 'rollup-playground',
        description: 'Use Rollup in browser',
        Icon: () => <span className='i-fluent-emoji-flat-joystick'></span>,
      },
    ],
    vscode: [
      {
        link: 'https://github.com/Maidang1/markdown-image-upload',
        title: 'markdown-image-upload',
        description: 'vscode extension easy insert image in markdown file',
        Icon: () => <span className='i-fluent-emoji-flat-abacus'></span>,
      },
    ],
  } as const;

  return (
    <div className='overflow-hidden mx-auto max-w-[1200px] font-mono'>
      <h1 className='mb-4 font-bold text-center dark:text-white text-3xl'>
        Projects
      </h1>

      {keys(projectList).map((project) => {
        const projectItems = projectList[project as keyof typeof projectList];
        return (
          <article className='w-full relative' key={project}>
            <Text text={project} className='relative text-7xl' />

            <div className='project-grid py-2 mx-auto max-w-[125rem] w-max grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {projectItems.map((projectItem) => {
                const { link, Icon, title, description } = projectItem;
                return (
                  <a
                    key={link}
                    title={title}
                    href={link}
                    target='_blank'
                    className='item relative flex items-center'
                  >
                    <div className='pt-2 pr-5'>
                      <div className='text-5xl opacity-50 '>
                        <Icon />
                      </div>
                    </div>
                    <div className='flex-auto dark:text-white'>
                      <div className='text-normal'>{title}</div>
                      <div className='text-sm opacity-50 font-normal'>
                        {description}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
};
