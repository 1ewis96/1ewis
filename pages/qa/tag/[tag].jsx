import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// This is a simple redirect page that takes a tag parameter and redirects to the search page
export default function TagRedirect() {
  const router = useRouter();
  const { tag } = router.query;
  
  useEffect(() => {
    // Only redirect once we have the tag parameter from the router
    if (tag) {
      router.replace({
        pathname: '/qa/search',
        query: { q: tag, page: 1 }
      });
    }
  }, [tag, router]);
  
  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
      <Head>
        <link rel="canonical" href={`https://1ewis.com/qa/search?q=${encodeURIComponent(tag || '')}`} />
        <title>Redirecting to search results for {tag} | 1ewis.com</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to search results for "{tag}"...</p>
      </div>
    </div>
  );
}
