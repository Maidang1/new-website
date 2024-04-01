import React, { Fragment } from 'react';

interface PageLayoutProps {
  children: React.ReactElement;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <div className='overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20'>
        <main className='flex prose m-auto px-8 text-black dark:text-white mt-24'>
          <div className='prose w-full' id='main-content'>
            {children}
          </div>
        </main>
      </div>
    </Fragment>
  );
};
export default PageLayout;
