import React from 'react';
import Script from 'next/script';

export default function QuestionStructuredData({ questionData }) {
  if (!questionData || !questionData.question) return null;
  
  const structuredData = {
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
        'text': answer.answer,
        'dateCreated': answer.timestamp,
        'author': {
          '@type': 'Person',
          'name': answer.username || 'Anonymous'
        },
        'upvoteCount': answer.upvotes || 0
      })) : []
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
