import '@/styles/globals.css';
import '@code-hike/mdx/dist/index.css';
import type { AppProps } from 'next/app';
import PageLayout from './layout/page';
import { useTransition, animated } from '@react-spring/web';
import { useRouter } from 'next/router';
import LayoutHeader from './layout/header';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const transition = useTransition(router, {
    keys: router.pathname,
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(50px)' },
    config: { duration: 400 },
  });
  const isBlogPage = router.pathname.startsWith('/blog/posts');

  return transition((style) => {
    return (
      <div className='overflow-hidden'>
        <LayoutHeader />
        <animated.div style={style}>
          <PageLayout isBlogPage={isBlogPage}>
            <Component {...pageProps} />
          </PageLayout>
        </animated.div>
      </div>
    );
  });
}
