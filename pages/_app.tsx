import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import PageLayout from './layout/page';
import { useTransition, animated } from '@react-spring/web';
import { useRouter } from 'next/router';
import LayoutHeader from './layout/header';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const transition = useTransition(router, {
    keys: router.pathname,
    from: { opacity: 0, transform: 'translateY(100px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(100px)' },
    config: { duration: 400 },
  });

  return transition((style) => {
    return (
      <>
        <LayoutHeader />
        <animated.div style={style}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </animated.div>
      </>
    );
  });
}
