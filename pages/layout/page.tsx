import React, { Fragment } from 'react';

interface PageLayoutProps {
  children: React.ReactElement;
  isBlogPage: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, isBlogPage }) => {
  return (
    <Fragment>
      <div className='overflow-y-auto h-screen overflow-x-hidden bg-gradient-radial pb-20'>
        <main
          className={`flex m-auto px-8 text-black dark:text-white mt-24 ${
            isBlogPage ? '' : 'prose'
          }`}
        >
          <div
            className={`w-full ${isBlogPage ? '' : 'prose'}`}
            id='main-content'
          >
            {children}
          </div>
        </main>
      </div>
    </Fragment>
  );
};
export default PageLayout;
