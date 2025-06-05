import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ThumbsUp, MessageCircle, Calendar, User, Tag as TagIcon, Clock } from 'lucide-react';
import Footer from '../../components/Footer';
import ClientOnly from '../../components/ClientOnly';
import Script from 'next/script';

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Fetch question data from API
  useEffect(() => {
    async function fetchQuestionData() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.1ewis.com/question/retrieve?pk=${id}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setQuestionData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load question data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined' && id) {
      fetchQuestionData();
    }
  }, [id]);
  
  // Handle back button
  const handleBack = () => {
    router.push('/qa');
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </button>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-400">Loading question...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </button>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-400">{error}</p>
            <button 
              onClick={() => router.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // No data state
  if (!questionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </button>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-400">Question not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>{questionData.question ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''} | Crypto Q&A | 1ewis.com` : 'Question | Crypto Q&A | 1ewis.com'}</title>
        <meta name="description" content={questionData.question ? `${questionData.question.substring(0, 160)}${questionData.question.length > 160 ? '...' : ''}` : 'Question details on cryptocurrency topics at 1ewis.com'} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://1ewis.com/qa/${id}`} />
        <meta property="og:title" content={questionData.question ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''}` : 'Crypto Question'} />
        <meta property="og:description" content={questionData.question ? `${questionData.question.substring(0, 160)}${questionData.question.length > 160 ? '...' : ''}` : 'Question details on cryptocurrency topics at 1ewis.com'} />
        <meta property="og:image" content="https://1ewis.com/images/og-qa.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://1ewis.com/qa/${id}`} />
        <meta property="twitter:title" content={questionData.question ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''}` : 'Crypto Question'} />
        <meta property="twitter:description" content={questionData.question ? `${questionData.question.substring(0, 160)}${questionData.question.length > 160 ? '...' : ''}` : 'Question details on cryptocurrency topics at 1ewis.com'} />
        <meta property="twitter:image" content="https://1ewis.com/images/og-qa.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://1ewis.com/qa/${id}`} />
        
        {/* Keywords based on question tags */}
        {questionData.tags && questionData.tags.length > 0 && (
          <meta name="keywords" content={`crypto, cryptocurrency, ${questionData.tags.join(', ')}`} />
        )}
      </Head>
      
      {/* JSON-LD structured data for Q&A */}
      {questionData.question && (
        <Script
          id="qa-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'QAPage',
              'mainEntity': {
                '@type': 'Question',
                'name': questionData.question,
                'text': questionData.question,
                'answerCount': questionData.answers ? questionData.answers.length : 0,
                'dateCreated': questionData.timestamp,
                'author': {
                  '@type': 'Person',
                  'name': questionData.username || 'Anonymous'
                },
                'answer': questionData.answers && questionData.answers.length > 0 ? questionData.answers.map(answer => ({
                  '@type': 'Answer',
                  'text': answer.content,
                  'dateCreated': answer.timestamp,
                  'author': {
                    '@type': 'Person',
                    'name': answer.username || 'Anonymous'
                  },
                  'upvoteCount': answer.upvotes || 0
                })) : []
              }
            })
          }}
        />
      )}

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Questions
        </button>
        
        {/* Question */}
        <article className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl mb-8">
          <div className="px-6 py-5">
            <h1 className="text-2xl font-bold text-white mb-6 leading-tight" id="question-title">{questionData.question}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {questionData.tags && questionData.tags.map((tag) => (
                <Link
                  href={`/qa/tag/${encodeURIComponent(tag)}`}
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-purple-400" />
                  <span>{questionData.username}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-purple-400" />
                  {questionData.timestamp ? (
                    <span>
                      {new Date(questionData.timestamp).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  ) : (
                    <span>Date unavailable</span>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                {questionData.timestamp && (
                  <span>{new Date(questionData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                )}
              </div>
            </div>
          </div>
        </article>
        
        {/* Answers */}
        <section className="mb-8" aria-labelledby="answers-heading">
          <h2 id="answers-heading" className="text-xl font-semibold text-white mb-6 flex items-center border-b border-gray-700/50 pb-3">
            <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
            {questionData.answers ? questionData.answers.length : 0} Answers
          </h2>
          
          <div className="space-y-6">
            {questionData.answers && questionData.answers.map((answer) => (
              <div key={answer.SK} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg transition-all hover:border-purple-700/50">
                <div className="px-6 py-5">
                  <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line">{answer.answer}</p>
                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-purple-400" />
                        <span>{answer.username}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-purple-400" />
                        {answer.timestamp ? (
                          <span>
                            {new Date(answer.timestamp).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        ) : (
                          <span>Date unavailable</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0 cursor-pointer hover:text-purple-400 transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                      <span>Helpful</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Beta Tester Modal */}
        <section className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl" aria-labelledby="answer-form-heading">
          <div className="px-6 py-8 text-center">
            <h3 id="answer-form-heading" className="text-lg font-medium text-white mb-5 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
              Your Answer
            </h3>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/50 mb-4">
              <MessageCircle className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              This feature is currently available to beta testers only. Join our beta program to start answering questions and helping the community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center"
                onClick={() => setShowBetaModal(true)}
              >
                Join Beta Program
              </button>
              <button
                className="px-5 py-2.5 bg-transparent border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400 rounded-md transition-colors flex items-center justify-center"
                onClick={() => window.open('https://1ewis.com/faq', '_blank')}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Beta Signup Modal */}
      {showBetaModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="beta-signup-heading">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 id="beta-signup-heading" className="text-xl font-semibold text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
                  Join Beta Program
                </h3>
                <button 
                  onClick={() => setShowBetaModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">Thank You!</h4>
                  <p className="text-gray-300 mb-6">Your request to join the beta program has been submitted. We'll be in touch soon!</p>
                  <button
                    onClick={() => setShowBetaModal(false)}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 mb-6">
                    Enter your email address to join our beta testing program and get early access to new features.
                  </p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!email) return;
                    
                    setIsSubmitting(true);
                    setSubmitError(null);
                    
                    // Simulate API call
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setSubmitSuccess(true);
                      // In a real implementation, you would make an API call here
                      // const response = await fetch('https://api.1ewis.com/beta/signup', {
                      //   method: 'POST',
                      //   headers: { 'Content-Type': 'application/json' },
                      //   body: JSON.stringify({ email })
                      // });
                    }, 1000);
                  }}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    {submitError && (
                      <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-300 text-sm">
                        {submitError}
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowBetaModal(false)}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : 'Submit'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
