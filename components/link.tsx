import Link from 'next/link';
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export const TagLink = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const { title, href, children } = props;
  const base =
    'flex justify-start items-center mx-1 no-underline transition-colors ease-linear text-black dark:text-white';
  const underline =
    'border-b border-black/20 hover:border-black/60 dark:border-white/20 dark:hover:border-white/60';
  const showUnderLine = title !== 'list';
  const className = `${base} ${showUnderLine ? underline : ''}`;

  return (
    <span className='inline-block align-bottom hover:opacity-70 break-words'>
      <Link href={href ?? ''} className={className}>
        {title && <span className={`${title} mr-1`} />}
        <span>{children}</span>
      </Link>
    </span>
  );
};
