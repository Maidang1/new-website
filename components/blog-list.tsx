import { PostListContext } from '@/stores/post-list-context';
import { useContext } from 'react';

export default function BlogsList() {
  const result = useContext(PostListContext);

  if (result.length === 0) return null;

  return (
    <>
      {result.map(({ name, result, title }) => (
        <a
          href={`/blog/${name}`}
          key={name}
          className='item block font-normal mb-6 mt-2 opacity-60 border-none no-underline cursor-pointer text-black dark:text-white hover:opacity-100 transition-all ease-linear'
        >
          <li className='no-underline list-none flex md:flex-row flex-col gap-2 md:items-center'>
            <span className='text-lg leading-3 flex gap-2 flex-wrap align-middle'>
              {title}
            </span>
            <span className='text-sm'>{result.words} words</span> |
            <span className='text-sm'>{result.text}</span>
          </li>
        </a>
      ))}
    </>
  );
}
