import React, { Fragment } from 'react';

interface PageLayoutProps {
  children: React.ReactElement;
  isBlogPage: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <div className='overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20'>
        <main className='flex m-auto px-8 container mx-auto mt-[120px] max-w-5xl prose'>
          <div className='w-full' id='main-content'>
            {children}
          </div>
        </main>
      </div>
    </Fragment>
  );
};
export default PageLayout;
