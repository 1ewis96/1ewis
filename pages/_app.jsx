import '../styles/globals.css';
import '../styles/quill.css';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import ConsentManager from '../components/ConsentManager';
import { initializeGoogleConsentMode, initializeTCF } from '../utils/consentManager';
import { FloatingVideoProvider } from '../context/FloatingVideoContext';
import FloatingVideoPlayerWrapper from '../components/videos/FloatingVideoPlayerWrapper';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://1ewis.com${router.asPath === '/' ? '' : router.asPath}`;
  // We don't need this state since we're using the context
  // const [activeFloatingVideo, setActiveFloatingVideo] = useState(null);
  
  // Initialize Google Consent Mode and TCF API on client-side only
  useEffect(() => {
    // Initialize Google's Consent Mode with default settings
    initializeGoogleConsentMode();
    
    // Initialize TCF API for IAB Transparency & Consent Framework
    initializeTCF();
  }, []);
  
  return (
    <FloatingVideoProvider>
      <Head>
        {/* Default meta tags - will be overridden by page-specific ones */}
        <title>1ewis.com | Best Crypto Exchanges, Wallets & Tools with Exclusive Bonuses</title>
        <meta name="description" content="Compare the best cryptocurrency exchanges, wallets, and tools with exclusive sign-up bonuses. Find low-fee exchanges, secure wallets, and earn passive income with crypto." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Default canonical URL - will be overridden by page-specific ones */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Common SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta charSet="UTF-8" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="1ewis.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewis_com" />
        
        {/* Preconnect to external domains to improve performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </Head>
      
      {/* Google AdSense */}
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2205553060041282"
        crossOrigin="anonymous"
      />
      
      {/* Google Tag Manager - No Script */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
      </noscript>
      
      {/* Global site tag - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-36XZJNJHRF`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-36XZJNJHRF');
        `}
      </Script>
      
      {/* Global structured data for organization */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': '1ewis.com',
            'url': 'https://1ewis.com',
            'logo': 'https://1ewis.com/logo.png',
            'sameAs': [
              'https://twitter.com/1ewis_com',
              'https://youtube.com/@1ewis_com'
            ],
            'description': 'Compare the best cryptocurrency exchanges, wallets, and tools with exclusive sign-up bonuses.'
          })
        }}
      />
      
      {/* Only show Navigation on non-admin pages */}
      {!router.pathname.startsWith('/admin') && <Navigation />}
      <Component {...pageProps} />
      {/* Only show ConsentManager on non-admin pages */}
      {!router.pathname.startsWith('/admin') && <ConsentManager />}
      
      {/* Floating Video Player - Shows on all pages once activated */}
      <FloatingVideoPlayerWrapper />
    </FloatingVideoProvider>
  );
}

export default MyApp;
