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
  
  // Keyword enhancement states
  const [linkTerms, setLinkTerms] = useState([]);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(false);
  const [keywordError, setKeywordError] = useState(null);
  
  
  // Enhance content with keywords
  const enhanceContent = (content) => {
    if (!content) return '';
    
    console.log('Enhancing content with: ', {
      linkTermsCount: linkTerms.length,
      glossaryTermsCount: glossaryTerms.length
    });
    console.log('Content before enhancement:', content);
    
    // Debug: Check if content contains DeFi
    if (content.includes('DeFi') || content.includes('defi') || content.includes('DEFI')) {
      console.log('FOUND DeFi in content!');
    }
    
    // Clone the content to avoid direct mutation
    let processedContent = content;
    
    // Helper function to escape special characters in regex
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    
    // Helper function to check if text is inside an HTML tag or already enhanced
    const isInsideHtmlTagOrEnhanced = (text, position) => {
      // Check if we're inside an HTML tag
      let openTagPos = text.lastIndexOf('<', position);
      let closeTagPos = text.lastIndexOf('>', position);
      if (openTagPos > closeTagPos) return true;
      
      // Check if we're inside a keyword-link or glossary-term
      const linkCheck = text.lastIndexOf('class="keyword-link"', position);
      const glossaryCheck = text.lastIndexOf('class="glossary-term"', position);
      if (linkCheck > -1 && text.indexOf('</a>', linkCheck) > position) return true;
      if (glossaryCheck > -1 && text.indexOf('</span>', glossaryCheck) > position) return true;
      
      return false;
    };
    
    // Hard-coded test keywords for development
    const hardcodedKeywords = [
      { type: 'link', keyword: 'DeFi', url: 'https://example.com/defi', caseSensitive: false },
      { type: 'glossary', keyword: 'DeFi', description: 'Decentralized Finance - financial applications built on blockchain technology', caseSensitive: false },
      { type: 'link', keyword: 'blockchain', url: 'https://example.com/blockchain', caseSensitive: false },
      { type: 'glossary', keyword: 'blockchain', description: 'A distributed database that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography.', caseSensitive: false },
      { type: 'glossary', keyword: 'NFTs', description: 'Non-fungible tokens are unique digital assets representing ownership of items', caseSensitive: false },
      { type: 'glossary', keyword: 'Layer-2', description: 'Scaling solutions built on top of blockchain networks', caseSensitive: false },
    ];
    
    // Process each keyword individually
    hardcodedKeywords.forEach(keywordObj => {
      try {
        const { type, keyword, caseSensitive } = keywordObj;
        const url = type === 'link' ? keywordObj.url : null;
        const description = type === 'glossary' ? keywordObj.description : null;
        
        console.log(`Processing ${type} keyword: '${keyword}'`);
        
        // Check if keyword exists in content (case insensitive)
        const searchPattern = new RegExp(keyword, 'i');
        if (!searchPattern.test(processedContent)) {
          console.log(`Keyword '${keyword}' not found in content`);
          return; // Skip to next keyword
        }
        
        console.log(`Found keyword '${keyword}' in content, replacing...`);
        
        // Split content to avoid replacing inside HTML tags
        const parts = processedContent.split(/(<[^>]*>)/g);
        
        // Process each part
        processedContent = parts.map(part => {
          // Skip HTML tags
          if (part.startsWith('<') && part.endsWith('>')) {
            return part;
          }
          
          // For text nodes, replace the keyword
          // Create regex with word boundaries and case sensitivity options
          const flags = caseSensitive ? 'g' : 'gi';
          const regex = new RegExp(`(\\b${escapeRegExp(keyword)}\\b|\\(${escapeRegExp(keyword)}\\))`, flags);
          
          return part.replace(regex, (match, offset) => {
            // Skip if this match is inside an HTML tag or already enhanced
            if (isInsideHtmlTagOrEnhanced(part, offset)) {
              return match;
            }
            
            // Handle parentheses
            const hasOpenParen = match.startsWith('(');
            const hasCloseParen = match.endsWith(')');
            const innerText = match.slice(hasOpenParen ? 1 : 0, hasCloseParen ? -1 : undefined);
            
            let replacement;
            if (type === 'link') {
              replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="keyword-link" style="color:#0066cc; text-decoration:underline; font-weight:500; position:relative; padding-right:1.2em; display:inline-block;">${innerText}<span style="position:absolute; font-size:0.8em; top:-0.2em; right:0.2em;">↗</span></a>`;
            } else { // glossary
              replacement = `<span class="glossary-term" data-glossary="${description.replace(/"/g, '&quot;')}" onmouseover="showGlossaryPanel(event, '${innerText}', '${description.replace(/"/g, '&quot;')}')" onmouseout="hideGlossaryPanel()">${innerText}</span>`;
            }
            
            // Add back parentheses if they were in the original match
            if (hasOpenParen) replacement = '(' + replacement;
            if (hasCloseParen) replacement = replacement + ')';
            
            return replacement;
          });
        }).join('');
        
      } catch (error) {
        console.error(`Error processing keyword ${keywordObj.keyword}:`, error);
      }
    });
    
    // Now process the API-provided keywords
    // Sort keywords by length (longest first) to avoid partial replacements
    const sortedLinkTerms = [...linkTerms].sort((a, b) => b.keyword.length - a.keyword.length);
    const sortedGlossaryTerms = [...glossaryTerms].sort((a, b) => b.keyword.length - a.keyword.length);
    
    // Debug: Show available keywords
    console.log('Available link terms: ', sortedLinkTerms.map(term => term.keyword));
    
    // Process link terms
    sortedLinkTerms.forEach(({ keyword, url, caseSensitive }) => {
      try {
        // Case-insensitive search to check if keyword exists at all
        const searchRegex = new RegExp(escapeRegExp(keyword), 'i');
        const hasKeyword = searchRegex.test(processedContent);
        console.log(`Checking for link keyword '${keyword}': ${hasKeyword ? 'FOUND' : 'NOT FOUND'}`);
        
        if (hasKeyword) {
          console.log(`Replacing '${keyword}' with link to ${url}`);
          const flags = caseSensitive ? 'g' : 'gi';
          
          // Split content to avoid replacing inside HTML tags
          const parts = processedContent.split(/(<[^>]*>)/g);
          
          // Process each part
          processedContent = parts.map(part => {
            // Skip HTML tags
            if (part.startsWith('<') && part.endsWith('>')) {
              return part;
            }
            
            // For text nodes, replace the keyword with word boundaries
            const regex = new RegExp(`(\\b${escapeRegExp(keyword)}\\b|\\(${escapeRegExp(keyword)}\\))`, flags);
            
            return part.replace(regex, (match, offset) => {
              // Skip if this match is inside an HTML tag or already enhanced
              if (isInsideHtmlTagOrEnhanced(part, offset)) {
                return match;
              }
              
              // Handle parentheses
              const hasOpenParen = match.startsWith('(');
              const hasCloseParen = match.endsWith(')');
              const innerText = match.slice(hasOpenParen ? 1 : 0, hasCloseParen ? -1 : undefined);
              
              let replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="keyword-link" style="color:#0066cc; text-decoration:underline; font-weight:500; position:relative; padding-right:1.2em; display:inline-block;">${innerText}<span style="position:absolute; font-size:0.8em; top:-0.2em; right:0.2em;">↗</span></a>`;
              
              // Add back parentheses if they were in the original match
              if (hasOpenParen) replacement = '(' + replacement;
              if (hasCloseParen) replacement = replacement + ')';
              
              return replacement;
            });
          }).join('');
        }
      } catch (error) {
        console.error(`Error processing link keyword ${keyword}:`, error);
      }
    });
    
    // Debug: Show available glossary terms
    console.log('Available glossary terms: ', sortedGlossaryTerms.map(term => term.keyword));
    
    // Process glossary terms
    sortedGlossaryTerms.forEach(({ keyword, description, caseSensitive }) => {
      try {
        // Case-insensitive search to check if keyword exists at all
        const searchRegex = new RegExp(escapeRegExp(keyword), 'i');
        const hasKeyword = searchRegex.test(processedContent);
        console.log(`Checking for glossary keyword '${keyword}': ${hasKeyword ? 'FOUND' : 'NOT FOUND'}`);
        
        if (hasKeyword) {
          console.log(`Replacing '${keyword}' with glossary tooltip`);
          const flags = caseSensitive ? 'g' : 'gi';
          
          // Split content to avoid replacing inside HTML tags
          const parts = processedContent.split(/(<[^>]*>)/g);
          
          // Process each part
          processedContent = parts.map(part => {
            // Skip HTML tags
            if (part.startsWith('<') && part.endsWith('>')) {
              return part;
            }
            
            // For text nodes, replace the keyword with word boundaries
            const regex = new RegExp(`(\\b${escapeRegExp(keyword)}\\b|\\(${escapeRegExp(keyword)}\\))`, flags);
            
            return part.replace(regex, (match, offset) => {
              // Skip if this match is inside an HTML tag or already enhanced
              if (isInsideHtmlTagOrEnhanced(part, offset)) {
                return match;
              }
              
              // Handle parentheses
              const hasOpenParen = match.startsWith('(');
              const hasCloseParen = match.endsWith(')');
              const innerText = match.slice(hasOpenParen ? 1 : 0, hasCloseParen ? -1 : undefined);
              
              let replacement = `<span class="glossary-term" data-glossary="${description.replace(/"/g, '&quot;')}" onmouseover="showGlossaryPanel(event, '${innerText}', '${description.replace(/"/g, '&quot;')}')" onmouseout="hideGlossaryPanel()">${innerText}</span>`;
              
              // Add back parentheses if they were in the original match
              if (hasOpenParen) replacement = '(' + replacement;
              if (hasCloseParen) replacement = replacement + ')';
              
              return replacement;
            });
          }).join('');
        }
      } catch (error) {
        console.error(`Error processing glossary keyword ${keyword}:`, error);
      }
    });
    
    console.log('Content after enhancement:', processedContent);
    return processedContent;
  };
  
  // Fetch keywords data for enhancement
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        setIsLoadingKeywords(true);
        
        // Define test keywords for development
        const testLinkTerms = [
          { keyword: 'blockchain', url: 'https://example.com/blockchain', caseSensitive: false },
          { keyword: 'DeFi', url: 'https://example.com/defi', caseSensitive: true },
        ];
        
        const testGlossaryTerms = [
          { keyword: 'NFTs', description: 'Non-fungible tokens are unique digital assets representing ownership of items', caseSensitive: true },
          { keyword: 'Layer-2', description: 'Scaling solutions built on top of blockchain networks', caseSensitive: false },
          { keyword: 'DeFi', description: 'Decentralized Finance - financial applications built on blockchain technology', caseSensitive: true },
        ];
        
        // In development mode, just use test data
        if (process.env.NODE_ENV !== 'production') {
          console.log('Using test keywords for development');
          setLinkTerms(testLinkTerms);
          setGlossaryTerms(testGlossaryTerms);
          setIsLoadingKeywords(false);
          return;
        }
        
        // Check if we have cached data
        const cachedData = localStorage.getItem('keywordData');
        const cachedTimestamp = localStorage.getItem('keywordDataTimestamp');
        
        // Use cache if it's less than 24 hours old
        if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp)) < 24 * 60 * 60 * 1000) {
          const { linkTerms, glossaryTerms } = JSON.parse(cachedData);
          setLinkTerms(linkTerms);
          setGlossaryTerms(glossaryTerms);
          setIsLoadingKeywords(false);
          return;
        }
        
        // Fetch from API if no cache or cache expired
        const linkResponse = await fetch('https://api.1ewis.com/keywords/list');
        const glossaryResponse = await fetch('https://api.1ewis.com/keywords/glossary');
        
        if (!linkResponse.ok || !glossaryResponse.ok) {
          throw new Error('Failed to fetch keywords');
        }
        
        const linkData = await linkResponse.json();
        const glossaryData = await glossaryResponse.json();
        
        // Store in state
        setLinkTerms(linkData);
        setGlossaryTerms(glossaryData);
        
        // Cache the combined data
        localStorage.setItem('keywordData', JSON.stringify({
          linkTerms: linkData,
          glossaryTerms: glossaryData
        }));
        localStorage.setItem('keywordDataTimestamp', Date.now().toString());
        
        setIsLoadingKeywords(false);
      } catch (error) {
        console.error('Error fetching keywords:', error);
        setKeywordError(error.message);
        setIsLoadingKeywords(false);
      }
    };
    
    fetchKeywords();
  }, []);
  
  // Add glossary panel functions to window object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showGlossaryPanel = (event, term, description) => {
        const panel = document.getElementById('glossary-panel');
        document.getElementById('glossary-term-title').textContent = term;
        document.getElementById('glossary-term-description').textContent = description;
        
        // Position the panel near the hovered term
        const rect = event.target.getBoundingClientRect();
        panel.style.left = rect.left + 'px';
        panel.style.top = (rect.bottom + 10) + 'px';
        panel.style.display = 'block';
        
        // Ensure panel stays within viewport
        const panelRect = panel.getBoundingClientRect();
        if (panelRect.right > window.innerWidth) {
          panel.style.left = (window.innerWidth - panelRect.width - 20) + 'px';
        }
      };
      
      window.hideGlossaryPanel = () => {
        // Add a small delay to allow for moving between terms
        setTimeout(() => {
          const panel = document.getElementById('glossary-panel');
          if (!panel.matches(':hover')) {
            panel.style.display = 'none';
          }
        }, 300);
      };
      
      // Allow hovering on the panel itself without closing
      const panel = document.getElementById('glossary-panel');
      if (panel) {
        panel.addEventListener('mouseleave', () => {
          panel.style.display = 'none';
        });
      }
    }
  }, []);
  
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
        
        {/* Styles for keyword enhancements */}
        <style jsx>{`
          .question-detail {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .question-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .question-meta {
            display: flex;
            justify-content: space-between;
            color: #666;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .question-content {
            margin-bottom: 30px;
            line-height: 1.6;
          }
          .answer-container {
            margin-top: 20px;
          }
          .answer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-bottom: 20px;
          }
          .answer-meta {
            display: flex;
            justify-content: space-between;
            color: #666;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .answer-content {
            line-height: 1.6;
          }
          .debug-panel {
            margin-top: 20px;
            padding: 10px;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .debug-panel h3 {
            margin-top: 0;
          }
          .debug-keywords {
            font-family: monospace;
            white-space: pre-wrap;
          }
          a.keyword-link, a.keyword-link:link, a.keyword-link:visited {
            color: #0066cc !important;
            text-decoration: underline !important;
            font-weight: 500 !important;
            position: relative !important;
            padding-right: 1.2em !important;
            display: inline-block !important;
          }
          a.keyword-link::after {
            content: '↗' !important;
            position: absolute !important;
            font-size: 0.8em !important;
            top: -0.2em !important;
            right: 0.2em !important;
            display: inline-block !important;
          }
          .glossary-term {
            color: #006600;
            border-bottom: 1px dotted #006600;
            cursor: help;
            font-weight: 500;
            position: relative;
          }
          /* Hover styles for glossary terms */
          .glossary-term:hover {
            background-color: rgba(0, 102, 0, 0.05);
          }
          #glossary-panel {
            position: fixed;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            padding: 15px;
            max-width: 300px;
            border-radius: 5px;
            z-index: 1000;
            display: none;
          }
          #glossary-panel h4 {
            margin-top: 0;
            margin-bottom: 8px;
            color: #006600;
          }
          #glossary-panel p {
            margin: 0;
            font-size: 14px;
          }
          #glossary-panel .close-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            font-size: 16px;
            color: #666;
          }
        `}</style>
        
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

      {/* Glossary panel */}
      <div id="glossary-panel">
        <span className="close-btn" onClick={() => document.getElementById('glossary-panel').style.display = 'none'}>×</span>
        <h4 id="glossary-term-title"></h4>
        <p id="glossary-term-description"></p>
      </div>
      
      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </button>
          
          {/* Keyword enhancement indicator */}
          {!isLoadingKeywords && !keywordError && (linkTerms.length > 0 || glossaryTerms.length > 0) && (
            <div className="flex items-center text-xs text-gray-400">
              <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
              <span>Enhanced with {linkTerms.length + glossaryTerms.length} keywords</span>
            </div>
          )}
        </div>
        
        {/* Debug panel - remove in production */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="bg-gray-800 border border-gray-700 p-4 mb-6 rounded-lg text-xs">
            <h3 className="font-bold text-white mb-2">Debug Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-400">Link Terms ({linkTerms.length}):</p>
                <ul className="list-disc pl-5 text-purple-400">
                  {linkTerms.map((term, i) => (
                    <li key={i}>{term.keyword} → {term.url}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-gray-400">Glossary Terms ({glossaryTerms.length}):</p>
                <ul className="list-disc pl-5 text-purple-400">
                  {glossaryTerms.map((term, i) => (
                    <li key={i}>{term.keyword}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Question */}
        <article className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl mb-8">
          <div className="px-6 py-5">
            <h1 
              className="text-2xl font-bold text-white mb-6 leading-tight" 
              id="question-title" 
              dangerouslySetInnerHTML={{ __html: enhanceContent(questionData.question, linkTerms, glossaryTerms) }}
            />
            
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
          
          {/* Keyword enhancement status */}
          {isLoadingKeywords && (
            <div className="text-sm text-gray-400 mb-4 flex items-center">
              <div className="animate-spin h-3 w-3 border-2 border-purple-500 border-t-transparent rounded-full mr-2"></div>
              Loading keyword enhancements...
            </div>
          )}
          
          {keywordError && (
            <div className="text-sm text-amber-400 mb-4">
              {keywordError}
            </div>
          )}
          
          <div className="space-y-6">
            {questionData.answers && questionData.answers.map((answer) => (
              <div key={answer.SK} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg transition-all hover:border-purple-700/50">
                <div className="px-6 py-5">
                  <p 
                    className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: enhanceContent(answer.answer, linkTerms, glossaryTerms) }}
                  />
                  {/* Debug info - remove in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs text-gray-500 mb-2 p-2 bg-gray-800/50 rounded">
                      <div>Keywords loaded: {linkTerms.length + glossaryTerms.length}</div>
                      <div>Link terms: {linkTerms.map(t => t.keyword).join(', ')}</div>
                      <div>Glossary terms: {glossaryTerms.map(t => t.keyword).join(', ')}</div>
                    </div>
                  )}
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
