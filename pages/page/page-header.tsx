export interface PageHeaderProps {
  title?: string;
  createdAt: string;
  tags: string[];
  author: string;
  description: string;
  image?: string;
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, tags, createdAt, author, description } = props;

  if (!title) return null;

  return (
    <div className='post-header mb-8'>
      <div className='mb-8 flex items-center relative text-4xl font-extrabold justify-center text-center'>
        {title}
      </div>
      <div className='text-zinc-400 flex min-w-0 shrink grow flex-wrap gap-2 text-sm mb-8 justify-center dark:text-white'>
        <span className='flex min-w-0 items-center space-x-1'>
          {new Date(createdAt).toLocaleString()}
        </span>
        <span className='flex min-w-0 items-center space-x-1'>
          {tags.map((tag) => (
            <span key={tag} className='inline-block'>
              #{tag}
            </span>
          ))}
        </span>
        <span className='flex min-w-0 items-center space-x-1'>{author}</span>
      </div>
      <div className='border rounded-xl mt-5 p-4 space-y-2'>
        <div className='font-bold text-zinc-700 flex items-center dark:text-white'>
          <span className='i-arcticons-openai-chatgpt mr-2 text-lg'></span>
          <span>AI Summary</span>
        </div>
        <div className='text-zinc-500 leading-loose text-sm dark:text-white'>
          {description}
        </div>
      </div>
    </div>
  );
};
