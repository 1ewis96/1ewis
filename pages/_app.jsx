import '../styles/globals.css';
import Head from 'next/head';
import Navigation from '../components/navigation';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>1ewis.com - Crypto Affiliate Portfolio</title>
        <meta name="description" content="Your gateway to the top crypto platforms. Compare the best, claim bonuses, and start trading smarter." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
