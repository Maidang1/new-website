import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import { TagLink } from './components/link';
import { heading } from './components/header';

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
    // nav: (props) => {
    //   console.log('nav', props);
    //   return null;
    // },
  };
}
