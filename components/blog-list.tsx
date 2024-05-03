import { PostListContext } from '@/stores/post-list-context';
import { useContext, useState } from 'react';
import { isEmpty, flatten } from 'lodash';
import { Text } from './year';

export default function BlogsList() {
  const { blogs, sortedYears } = useContext(PostListContext);
  const [currentCategory, setCurrentCategory] = useState<string>('blog');
  if (isEmpty(blogs)) return null;
  const length = flatten(Object.values(blogs)).filter(
    (blog) => blog.category === currentCategory
  ).length;

  const BlogListHeader = () => (
    <div>
      <ul className='flex gap-4 mb-4 list-none font-mono pl-0'>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <li
          className={`cursor-pointer hover:opacity-100 text-black dark:text-white ${
            currentCategory === 'blog' ? 'opacity-100' : 'opacity-50'
          } `}
          onClick={() => setCurrentCategory('blog')}
        >
          <span className='text-3xl'>Blog</span>
        </li>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <li
          className={`cursor-pointer hover:opacity-100 deep-hover text-black dark:text-white ${
            currentCategory === 'record' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() => setCurrentCategory('record')}
        >
          <span className='text-3xl'>Record</span>
        </li>
      </ul>
      <div className='flex items-center my-2'>
        <div className='flex-auto border-b border-dashed border-current opacity-30' />
        <div className='mx-4'>
          {' '}
          A total of <b>{length}</b> articles{' '}
        </div>
        <div className='flex-auto border-b border-dashed border-current opacity-30' />
      </div>
    </div>
  );

  if (length === 0) {
    return <BlogListHeader />;
  }

  return (
    <div>
      <BlogListHeader />
      <div className='mt-[8em]'>
        {sortedYears.map((key) => {
          let blogList = blogs[key];
          blogList = blogList.filter(
            (blog) => blog.category === currentCategory
          );

          if (isEmpty(blogList)) return null;
          return (
            <div className='relative mb-[8em]' key={key}>
              <Text
                text={`${key}`}
                className='pointer-events-none !absolute -top-[0.8em]'
              />
              {blogList.map(({ name, title, readingTime, createTime }) => (
                <a
                  href={`/blog/${name}`}
                  key={name}
                  className='item block font-normal mb-6 mt-2 opacity-60 border-none no-underline cursor-pointer text-black dark:text-white hover:opacity-100 transition-all ease-linear'
                >
                  <li className='no-underline list-none flex gap-2 items-center font-mono'>
                    <span className='text-sm opacity-70 font-mono'>
                      {new Date(createTime).toLocaleDateString()}
                    </span>
                    <span className='display-none md:display-inline'>·</span>
                    <span className='text-lg gap-2 flex-wrap align-middle text-ellipsis overflow-hidden line-clamp-1 flex-1'>
                      {title}
                    </span>
                    <span className='text-sm whitespace-nowrap'>
                      {readingTime.text}
                    </span>
                  </li>
                </a>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
