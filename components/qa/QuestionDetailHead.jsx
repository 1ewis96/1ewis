import React from 'react';
import Head from 'next/head';

export default function QuestionDetailHead({ questionData, id }) {
  const title = questionData.question 
    ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''} | Crypto Q&A | 1ewis.com` 
    : 'Question | Crypto Q&A | 1ewis.com';
  
  const description = questionData.question 
    ? `${questionData.question.substring(0, 160)}${questionData.question.length > 160 ? '...' : ''}` 
    : 'Question details on cryptocurrency topics at 1ewis.com';
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://1ewis.com/qa/${id}`} />
      <meta property="og:title" content={questionData.question ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''}` : 'Crypto Question'} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://1ewis.com/images/og-qa.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://1ewis.com/qa/${id}`} />
      <meta property="twitter:title" content={questionData.question ? `${questionData.question.substring(0, 60)}${questionData.question.length > 60 ? '...' : ''}` : 'Crypto Question'} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://1ewis.com/images/og-qa.jpg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://1ewis.com/qa/${id}`} />
      
      {/* Keywords based on question tags */}
      {questionData.tags && questionData.tags.length > 0 && (
        <meta name="keywords" content={`crypto, cryptocurrency, ${questionData.tags.join(', ')}`} />
      )}
    </Head>
  );
}
