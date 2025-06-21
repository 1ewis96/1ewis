import React from 'react';
import Script from 'next/script';

export default function QuestionStructuredData({ questionData }) {
  if (!questionData || !questionData.question) return null;
  
  // Format dates properly for Schema.org
  const formatDate = (timestamp) => {
    if (!timestamp) return new Date().toISOString();
    return new Date(timestamp).toISOString();
  };
  
  // Find the accepted answer if any (highest upvotes)
  const getAcceptedAnswer = () => {
    if (!questionData.answers || questionData.answers.length === 0) return null;
    
    // If there's a marked accepted answer, use that
    const acceptedAnswer = questionData.answers.find(a => a.isAccepted);
    if (acceptedAnswer) return acceptedAnswer;
    
    // Otherwise use the answer with the most upvotes
    return [...questionData.answers].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))[0];
  };
  
  const acceptedAnswer = getAcceptedAnswer();
  
  // Build answers array with proper formatting
  const answersArray = questionData.answers && questionData.answers.length > 0 
    ? questionData.answers.map(answer => ({
        '@type': 'Answer',
        'text': answer.answer,
        'dateCreated': formatDate(answer.timestamp),
        'datePublished': formatDate(answer.timestamp),
        'author': {
          '@type': 'Person',
          'name': answer.username || 'Crypto Expert'
        },
        'upvoteCount': answer.upvotes || 0,
        // Mark if this is the accepted answer
        ...(answer === acceptedAnswer ? { 'isAccepted': true } : {})
      }))
    : [];
  
  // Extract tags for keywords
  const keywords = questionData.tags && questionData.tags.length > 0 
    ? questionData.tags.join(', ') 
    : 'cryptocurrency, bitcoin, blockchain';
  
  // Build the main structured data object
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    'mainEntity': {
      '@type': 'Question',
      'name': questionData.question,
      'text': questionData.question,
      'answerCount': questionData.answers ? questionData.answers.length : 0,
      'dateCreated': formatDate(questionData.timestamp),
      'datePublished': formatDate(questionData.timestamp),
      'dateModified': formatDate(questionData.updatedAt || questionData.timestamp),
      'author': {
        '@type': 'Person',
        'name': questionData.username || 'Crypto Enthusiast'
      },
      'keywords': keywords,
      'inLanguage': 'en',
      // Since all answers are accepted, use acceptedAnswer for all answers
      'acceptedAnswer': answersArray
    },
    // Add publisher information
    'publisher': {
      '@type': 'Organization',
      'name': '1ewis.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://1ewis.com/images/logo.png'
      }
    }
  };

  return (
    <Script
      id="qa-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
