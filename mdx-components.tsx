import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import { TagLink } from './components/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ExtraTitle: ({ children }) => (
      <div
        children={children}
        className='font-bold text-4xl py-4 text-black dark:text-white'
      />
    ),
    a: TagLink,
    ...components,
  };
}
