import React from 'react';
import Head from 'next/head';

export default function QuestionDetailHead({ questionData, id }) {
  // Get the first answer if available for meta description
  const firstAnswer = questionData.answers && questionData.answers.length > 0 
    ? questionData.answers[0].answer 
    : '';
  
  // Create a more SEO-friendly title that includes "Q&A" and the main topic
  const title = questionData.question 
    ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''} | Crypto Q&A | 1ewis.com` 
    : 'Cryptocurrency Question & Answer | Crypto Q&A | 1ewis.com';
  
  // Create a more comprehensive description that includes both question and answer snippet
  const description = questionData.question 
    ? `Q: ${questionData.question.substring(0, 100)}${questionData.question.length > 100 ? '...' : ''}${firstAnswer ? ` A: ${firstAnswer.substring(0, 60)}${firstAnswer.length > 60 ? '...' : ''}` : ''}` 
    : 'Expert answers to cryptocurrency questions at 1ewis.com';
  
  // Extract topics from tags or use default topics
  const topics = questionData.tags && questionData.tags.length > 0 
    ? questionData.tags.join(', ') 
    : 'cryptocurrency, bitcoin, blockchain, crypto investing';
  
  // Format the date for SEO purposes
  const datePublished = questionData.timestamp 
    ? new Date(questionData.timestamp).toISOString() 
    : new Date().toISOString();
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://1ewis.com/qa/${id}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://1ewis.com/images/og-qa.jpg" />
      <meta property="article:published_time" content={datePublished} />
      <meta property="article:section" content="Cryptocurrency Q&A" />
      <meta property="article:tag" content={topics} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://1ewis.com/qa/${id}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://1ewis.com/images/og-qa.jpg" />
      
      {/* Canonical URL - ensure proper formatting */}
      <link rel="canonical" href={`https://1ewis.com/qa/${id}`} />
      
      {/* Keywords based on question tags with fallback */}
      <meta name="keywords" content={`crypto Q&A, cryptocurrency questions, ${topics}`} />
      
      {/* Additional meta tags for Q&A pages */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="page-type" content="Q&A" />
      <meta name="audience" content="cryptocurrency enthusiasts, investors, traders" />
      <meta name="content-language" content="en" />
    </Head>
  );
}
