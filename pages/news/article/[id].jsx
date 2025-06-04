import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, MessageSquare, Send } from 'lucide-react';
import Footer from '../../../components/Footer';
import { fetchArticleById, formatPublishedDate } from '../../../utils/newsApi';

export default function ArticlePage() {
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const [commentsNextToken, setCommentsNextToken] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [postCommentError, setPostCommentError] = useState(null);
  const MAX_COMMENT_LENGTH = 180;
  
  const router = useRouter();
  const { id: articleIdFromUrl } = router.query; // Renamed to avoid conflict with article.id from fetched data
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Set router ready state when router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  const handleCommentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_COMMENT_LENGTH) {
      setNewComment(text);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '' || !article || !articleIdFromUrl) return;

    setPostingComment(true);
    setPostCommentError(null);

    const articlePK = `article#${articleIdFromUrl}`;
    const payload = {
      name: commenterName.trim() === '' ? 'Anonymous' : commenterName.trim(),
      comment: newComment.trim(),
      PK: articlePK,
    };

    try {
      const response = await fetch('https://api.1ewis.com/news/comment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to post comment' }));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }
      
      // Comment posted successfully
      setNewComment('');
      setCommenterName('');
      // Refetch comments to show the new one
      fetchComments(articleIdFromUrl, null);
    } catch (err) {
      setPostCommentError(err.message);
    } finally {
      setPostingComment(false);
    }
  };

  const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Function to fetch comments
  const fetchComments = async (currentArticleId, token = null) => {
    if (!currentArticleId) return;
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const articlePK = `article#${currentArticleId}`;
      let url = `https://api.1ewis.com/news/comments/?PK=${encodeURIComponent(articlePK)}&limit=10`;
      if (token) {
        url += `&nextToken=${encodeURIComponent(token)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch comments' }));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }
      const data = await response.json();
      setComments(prevComments => token ? [...prevComments, ...data.comments] : data.comments);
      setCommentsNextToken(data.nextToken || null);
    } catch (err) {
      setCommentsError(err.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Effect to fetch article details
  // Track article view
  const trackArticleView = async (articleData) => {
    if (!articleData || !articleData.PK || !articleData.SK) return;
    
    try {
      const response = await fetch('https://api.1ewis.com/analytics/views/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PK: articleData.PK,
          SK: articleData.SK
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to track article view:', response.status);
      }
    } catch (err) {
      console.error('Error tracking article view:', err);
      // Non-blocking error - we don't want to affect the user experience
    }
  };

  useEffect(() => {
    if (articleIdFromUrl) {
      setLoading(true);
      fetchArticleById(articleIdFromUrl)
        .then(data => {
          setArticle(data);
          setError(null);
          // After fetching article, fetch its comments
          fetchComments(articleIdFromUrl, null);
          
          // Track the article view
          trackArticleView(data);
        })
        .catch(err => {
          console.error('Failed to fetch article:', err);
          setError(err.message || 'Failed to load article data.');
          setArticle(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // No ID, so not loading
    }
  }, [articleIdFromUrl]);

  // Show loading state if router is not ready yet or if we're actively loading the article
  if (!isRouterReady || (isRouterReady && articleIdFromUrl && loading)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // If there was an error loading the article or no article was found
  if (isRouterReady && (error || (!loading && !article))) {
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
        <link rel="canonical" href={`https://1ewis.com/news/article/${articleIdFromUrl}`} />
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

          {/* Comment Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <MessageSquare className="w-7 h-7 mr-3 text-green-400" /> Comments ({comments.length})
            </h2>

            {/* Comment Input Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <input
                type="text"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full p-3 mb-3 bg-gray-900/70 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:opacity-50" disabled={postingComment}
              />
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write your comment here... (max 180 characters)"
                className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none h-28 disabled:opacity-50" disabled={postingComment}
                maxLength={MAX_COMMENT_LENGTH}
              />
              <div className="flex justify-between items-center mt-2">
                <p className={`text-sm ${newComment.length === MAX_COMMENT_LENGTH ? 'text-red-400' : 'text-gray-400'}`}>
                  {MAX_COMMENT_LENGTH - newComment.length} characters remaining
                </p>
                <button
                  type="submit"
                  disabled={newComment.trim() === '' || postingComment}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {postingComment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </div>
              {postCommentError && (
                <p className="mt-2 text-sm text-red-400">Error: {postCommentError}</p>
              )}
            </form>

            {/* Display Comments */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.SK} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 mr-2 text-green-400" />
                    <span className="font-semibold text-green-300 mr-2">{comment.name}</span>
                    <span className="text-xs text-gray-500">{formatCommentDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
                </div>
              ))}
              {commentsLoading && comments.length === 0 && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto mb-2"></div>
                  <p className="text-gray-400">Loading comments...</p>
                </div>
              )}
              {commentsError && comments.length === 0 && (
                <p className="text-red-400 text-center py-4">Error loading comments: {commentsError}</p>
              )}
              {!commentsLoading && !commentsError && comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
              )}
              {commentsNextToken && !commentsLoading && (
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => fetchComments(articleIdFromUrl, commentsNextToken)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
                  >
                    Load More Comments
                  </button>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
