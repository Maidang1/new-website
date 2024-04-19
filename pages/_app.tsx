import '@/styles/globals.css';
import '@code-hike/mdx/dist/index.css';
import type { AppProps } from 'next/app';
import { useTransition, animated } from '@react-spring/web';
import LayoutHeader from './layout/header';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const transition = useTransition(router, {
    keys: router.asPath,
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(50px)' },
    config: { duration: 400 },
  });

  return transition((style) => {
    return (
      <div className='overflow-hidden dark:bg-black'>
        <LayoutHeader />
        <animated.div style={style}>
          <Component {...pageProps} />
        </animated.div>
      </div>
    );
  });
}
