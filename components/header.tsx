import { Hash } from 'lucide-react';
import { ReactNode } from 'react';

type HeadingProps = {
  id?: string;
  children?: ReactNode;
};

export const heading = (As: 'h1' | `h2` | `h3` | `h4` | `h5` | `h6`) => {
  const Heading = ({ id, children }: HeadingProps) => (
    <a href={`#${id}`} className='group relative no-underline'>
      <Hash className='absolute -left-6 hidden group-hover:block p-1 pink-cyan-500 h-full top-[50%] translate-y-[-50%]' />
      <As id={id}>{children}</As>
    </a>
  );
  Heading.displayName = As;
  return Heading;
};
