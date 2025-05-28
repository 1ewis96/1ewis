import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import Footer from '../../../components/Footer';
import { fetchArticleById, formatPublishedDate } from '../../../utils/newsApi';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Only fetch when we have an ID (after hydration)
    if (!id) return;
    
    async function loadArticle() {
      try {
        setLoading(true);
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
  }, [id]);

  // If the page is not yet generated, display loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // If there was an error loading the article
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pt-28 px-4">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4 text-red-400">Error Loading Article</h1>
          <p className="mb-8">{error || 'Article not found'}</p>
          <Link href="/news">
            <span className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors inline-block">
              Return to News
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  // Format the published date
  const formattedDate = formatPublishedDate(article.publishedAt);
  
  // Get primary tag if available
  const primaryTag = article.tags && article.tags.length > 0 ? article.tags[0] : 'News';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>{article.title} | 1ewis.com News</title>
        <meta name="description" content={article.summary} />
        <link rel="canonical" href={`https://1ewis.com/news/article/${id}`} />
      </Head>
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/news" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to News</span>
        </Link>
        
        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formattedDate}</span>
              </div>
              
              {article.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{article.author.name}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                <span>{primaryTag}</span>
              </div>
              
              <div>{article.readTime}</div>
            </div>
            
            {/* Featured Image */}
            <div className="w-full h-64 md:h-80 bg-gray-800 rounded-lg mb-8">
              {article.thumbnailUrl ? (
                <img 
                  src={article.thumbnailUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  [Featured Image Placeholder]
                </div>
              )}
            </div>
          </header>
          
          {/* Article Content */}
          <div 
            className="prose prose-invert prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Sponsored Tag if applicable */}
          {article.sponsored && article.sponsored.isSponsored && (
            <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong>Sponsored Content:</strong> {article.sponsored.disclosure}
              </p>
            </div>
          )}
          
          {/* Source Attribution */}
          {article.source && article.source.name && (
            <div className="mt-6 text-sm text-gray-500">
              Source: {article.source.url ? (
                <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                  {article.source.name}
                </a>
              ) : (
                article.source.name
              )}
            </div>
          )}
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link href={`/news?tag=${tag}`} key={tag}>
                  <span className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors cursor-pointer">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          )}
          
          {/* Share Links */}
          <div className="mt-12 pt-6 border-t border-gray-800">
            <div className="flex items-center">
              <span className="mr-4 text-gray-400">Share this article:</span>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
