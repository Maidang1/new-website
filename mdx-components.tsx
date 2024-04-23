import type { MDXComponents } from 'mdx/types';
import { TagLink } from './components/link';
import { heading } from './components/header';
import BlogsList from './components/blog-list';
import { Projects } from './components/project-list';
export function useMDXComponents(): MDXComponents {
  return {
    ExtraTitle: ({ children }) => (
      <div
        children={children}
        className='font-bold text-4xl py-4 text-black dark:text-white'
      />
    ),
    a: TagLink,
    h1: heading('h1'),
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    h5: heading('h5'),
    h6: heading('h6'),
    BlogsList,
    Projects,
    blockquote: ({ children }) => {
      return (
        <blockquote className='before:bg-blue-500 not-italic not-prose before:h-full before:w-[2px] before:inline-block relative before:absolute top-0 bottom-0 -left-2 ml-2'>
          <div className='mb-1 inline-flex items-center text-blue-500 dark:text-blue-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 256 256'
              className='shrink-0 text-2xl md:mr-1 md:self-start md:text-left ml-3'
            >
              <path
                fill='currentColor'
                d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8Zm-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z'
              ></path>
            </svg>
            <span className='font-semibold'>Note</span>
          </div>
          <div className='pl-4'>{children}</div>
        </blockquote>
      );
    },
  };
}
