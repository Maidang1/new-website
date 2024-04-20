import { PostListContext } from '@/stores/post-list-context';
import { useContext } from 'react';
import { isEmpty } from 'lodash';

export default function BlogsList() {
  const result = useContext(PostListContext);

  if (isEmpty(result)) return null;

  return (
    <>
      {result.map(({ name, readingInfo, title }) => (
        <a
          href={`/blog/${name}`}
          key={name}
          className='item block font-normal mb-6 mt-2 opacity-60 border-none no-underline cursor-pointer text-black dark:text-white hover:opacity-100 transition-all ease-linear'
        >
          <li className='no-underline list-none flex  gap-2 items-center'>
            <span className='text-lg gap-2 flex-wrap align-middle text-ellipsis overflow-hidden line-clamp-1 flex-1'>
              {title}
            </span>
            <span className='text-sm whitespace-nowrap'>
              {readingInfo.words} words
            </span>{' '}
            |
            <span className='text-sm whitespace-nowrap'>
              {readingInfo.text}
            </span>
          </li>
        </a>
      ))}
    </>
  );
}
