import { Text } from './year';

export const Projects = () => {
  return (
    <div className='overflow-hidden mx-auto max-w-[1200px] font-mono'>
      <h1 className='mb-4 font-bold text-center dark:text-white text-3xl'>
        Projects
      </h1>
      <article className='w-full relative'>
        <Text text='Farm Ecosystem' className='relative text-7xl' />

        <div className='project-grid py-2 mx-auto max-w-[125rem] w-max grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <a
            title='farm-plugin-virtual'
            href='https://github.com/Maidang1/farm-plugin-virtual'
            target='_blank'
            className='item relative flex items-center'
          >
            <div className='pt-2 pr-5'>
              <div className='text-5xl opacity-50 i-fluent-emoji-flat-cookie'></div>
            </div>
            <div className='flex-auto dark:text-white'>
              <div className='text-normal'>farm-plugin-virtual</div>
              <div className='text-sm opacity-50 font-normal'>
                A rust plugin for farm to easily use virtual module
              </div>
            </div>
          </a>
        </div>
      </article>
    </div>
  );
};
