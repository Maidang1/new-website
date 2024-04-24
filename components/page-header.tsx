import { BlogItem } from '@/utils/post';

export const PageHeader = (props: BlogItem) => {
  const { title, tags, createTime, description } = props;

  if (!title) return null;

  return (
    <div className='post-header mb-8'>
      <div className='mb-8 flex items-center relative text-4xl font-extrabold justify-center text-center'>
        {title}
      </div>
      <div className='text-zinc-400 flex min-w-0 shrink grow flex-wrap gap-2 text-sm mb-8 justify-center dark:text-white'>
        <span className='flex min-w-0 items-center space-x-1'>
          {new Date(createTime).toLocaleString()}
        </span>
        <span className='flex min-w-0 items-center space-x-1'>
          {tags.map((tag) => (
            <span key={tag} className='inline-block'>
              #{tag}
            </span>
          ))}
        </span>
      </div>
      <div className='border rounded-xl mt-5 p-4 space-y-2'>
        <div className='font-bold text-zinc-700 flex items-center dark:text-white'>
          <span className='mr-2 text-lg i-mingcute-sparkles-2-line'></span>
          <span>AI Summary</span>
        </div>
        <div className='text-zinc-500 leading-loose text-sm dark:text-white'>
          {description}
        </div>
      </div>
    </div>
  );
};
