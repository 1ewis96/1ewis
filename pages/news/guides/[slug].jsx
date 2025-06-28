import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer';
import Navigation from '../../../components/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GuideSidebar from '../../../components/guides/GuideSidebar';
import { ArrowLeft, Calendar, Tag, Clock, Share2, ArrowRight, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import SectionInteractiveElements from '../../../components/guides/SectionInteractiveElements';
import StarRating from '../../../components/guides/StarRating';


// Dynamically import components with SSR disabled to prevent hydration issues
const CryptoPriceTracker = dynamic(
  () => import('../../../components/guides/CryptoPriceTracker'),
  { ssr: false }
);

const CryptoCalculator = dynamic(
  () => import('../../../components/guides/CryptoCalculator'),
  { ssr: false }
);

const InteractiveQuiz = dynamic(
  () => import('../../../components/guides/InteractiveQuiz'),
  { ssr: false }
);

const SingleTokenPrice = dynamic(
  () => import('../../../components/guides/SingleTokenPrice'),
  { ssr: false }
);

const AutoplayVideoPlayer = dynamic(
  () => import('../../../components/guides/AutoplayVideoPlayer'),
  { ssr: false }
);

export default function GuidePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState(0);
  const [showAutoplayVideo, setShowAutoplayVideo] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasSetupAutoplay = useRef(false);
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [contentProcessed, setContentProcessed] = useState(false);
  const mainContentRef = useRef(null);
  
  // Track if the analytics call has been made for this page view
  const [analyticsLogged, setAnalyticsLogged] = useState(false);
  
  // Simple text rendering function that preserves newlines
  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
  // State for keywords to hyperlink
  const [keywordsToLink, setKeywordsToLink] = useState([]);
  
  // Fetch keywords from API
  useEffect(() => {
    fetch('https://api.1ewis.com/keywords/list')
      .then(response => response.json())
      .then(data => {
        if (data && data.linkTerms && Array.isArray(data.linkTerms)) {
          setKeywordsToLink(data.linkTerms);
          setContentProcessed(true);
        }
      })
      .catch(error => {
        console.error('Error fetching keywords:', error);
      });
  }, []);

  // Process text to HTML, including markdown links, keywords, and newlines
  const processTextToHtml = (text) => {
    if (!text) return '';
    
    // First replace newlines with <br> tags
    let processedText = text.replace(/\n/g, '<br>');
    
    // Process markdown links first
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    processedText = processedText.replace(linkRegex, (match, linkText, linkUrl) => {
      return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 transition-colors underline inline-flex items-center">${linkText}</a>`;
    });
    
    // Process keywords with links
    if (keywordsToLink && keywordsToLink.length > 0) {
      // Sort keywords by length (longest first) to avoid replacing parts of longer keywords
      const sortedKeywords = [...keywordsToLink].sort((a, b) => 
        (b.keyword?.length || 0) - (a.keyword?.length || 0)
      );
      
      // Process each keyword directly
      sortedKeywords.forEach(({ keyword, url, caseSensitive }) => {
        if (!keyword || !url) return;
        
        try {
          // Create a simple string-based replacement function
          // This avoids regex complexities and should work in all environments
          const replaceKeywordWithLink = (text, keyword, url, caseSensitive) => {
            // Split the HTML into segments to avoid processing inside HTML tags or URLs
            const htmlSegments = [];
            const textSegments = [];
            const urlSegments = [];
            
            // First, split the text to separate HTML tags
            let remainingText = text;
            let insideTag = false;
            let insideUrl = false;
            let currentSegment = '';
            
            // Helper to add current segment to appropriate array
            const addCurrentSegment = () => {
              if (currentSegment) {
                if (insideTag) {
                  htmlSegments.push(currentSegment);
                } else if (insideUrl) {
                  urlSegments.push(currentSegment);
                } else {
                  textSegments.push(currentSegment);
                }
                currentSegment = '';
              }
            };
            
            // Parse the HTML to separate tags, URLs, and text content
            for (let i = 0; i < remainingText.length; i++) {
              const char = remainingText[i];
              const nextChar = i < remainingText.length - 1 ? remainingText[i + 1] : '';
              
              // Detect HTML tags
              if (char === '<' && !insideUrl) {
                addCurrentSegment();
                insideTag = true;
                currentSegment += char;
              } 
              // Detect end of HTML tag
              else if (char === '>' && insideTag) {
                currentSegment += char;
                addCurrentSegment();
                insideTag = false;
              }
              // Detect URLs (http://, https://, www.)
              else if (!insideTag && !insideUrl && 
                      ((char === 'h' && remainingText.substring(i, i + 7).toLowerCase() === 'http://') || 
                       (char === 'h' && remainingText.substring(i, i + 8).toLowerCase() === 'https://') || 
                       (char === 'w' && remainingText.substring(i, i + 4).toLowerCase() === 'www.'))) {
                addCurrentSegment();
                insideUrl = true;
                currentSegment += char;
              }
              // Detect end of URL (space or HTML tag)
              else if (insideUrl && (char === ' ' || char === '<' || char === '\n' || char === '\r')) {
                addCurrentSegment();
                insideUrl = false;
                
                // Handle the current character appropriately
                if (char === '<') {
                  insideTag = true;
                  currentSegment += char;
                } else {
                  currentSegment += char;
                }
              }
              // Continue building current segment
              else {
                currentSegment += char;
              }
            }
            
            // Add the final segment
            addCurrentSegment();
            
            // Now process only the text segments for keyword replacement
            const processedSegments = [];
            
            // Add HTML and URL segments as is, process text segments for keywords
            let segmentIndex = 0;
            for (let i = 0; i < text.length; i++) {
              if (insideTag || insideUrl) {
                // Skip processing inside tags or URLs
                continue;
              }
              
              // Process each text segment
              textSegments.forEach((segment, index) => {
                // Process this text segment for keywords
                let processedSegment = segment;
                
                // Find all occurrences of the keyword in this segment
                let segmentRemaining = segment;
                const segmentParts = [];
                
                let searchIndex = 0;
                while (searchIndex < segmentRemaining.length) {
                  // Find the next occurrence of the keyword
                  const keywordIndex = caseSensitive 
                    ? segmentRemaining.indexOf(keyword, searchIndex)
                    : segmentRemaining.toLowerCase().indexOf(keyword.toLowerCase(), searchIndex);
                  
                  if (keywordIndex === -1) break; // No more occurrences
                  
                  // Check if this is a whole word (has word boundaries)
                  const beforeChar = keywordIndex > 0 ? segmentRemaining[keywordIndex - 1] : ' ';
                  const afterChar = keywordIndex + keyword.length < segmentRemaining.length 
                    ? segmentRemaining[keywordIndex + keyword.length] 
                    : ' ';
                  
                  const isWordBoundaryBefore = /[\s.,;:!?()\[\]{}"'<>]/.test(beforeChar);
                  const isWordBoundaryAfter = /[\s.,;:!?()\[\]{}"'<>]/.test(afterChar);
                  
                  if (isWordBoundaryBefore && isWordBoundaryAfter) {
                    // It's a whole word, replace it
                    const before = segmentRemaining.substring(0, keywordIndex);
                    const actualKeyword = segmentRemaining.substring(keywordIndex, keywordIndex + keyword.length);
                    const after = segmentRemaining.substring(keywordIndex + keyword.length);
                    
                    // Add the part before the keyword
                    segmentParts.push(before);
                    
                    // Add the keyword as a link
                    segmentParts.push(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-cyan-500 hover:text-cyan-400 font-medium transition-colors">${actualKeyword}</a>`);
                    
                    // Continue with the remaining text
                    segmentRemaining = after;
                    searchIndex = 0;
                  } else {
                    // Not a whole word, skip this occurrence
                    searchIndex = keywordIndex + 1;
                  }
                }
                
                // Add any remaining text
                if (segmentRemaining.length > 0) {
                  segmentParts.push(segmentRemaining);
                }
                
                // Replace the segment with its processed version
                processedSegment = segmentParts.join('');
                processedSegments.push(processedSegment);
              });
            }
            
            // Reconstruct the full HTML by interleaving the segments
            const result = [];
            let htmlIndex = 0;
            let textIndex = 0;
            let urlIndex = 0;
            
            for (let i = 0; i < text.length;) {
              if (i < text.length && text.substring(i, i + 1) === '<') {
                // Add an HTML segment
                if (htmlIndex < htmlSegments.length) {
                  result.push(htmlSegments[htmlIndex]);
                  i += htmlSegments[htmlIndex].length;
                  htmlIndex++;
                } else {
                  i++;
                }
              } 
              // Check for URL patterns
              else if (i < text.length - 7 && 
                      ((text.substring(i, i + 7).toLowerCase() === 'http://') || 
                       (i < text.length - 8 && text.substring(i, i + 8).toLowerCase() === 'https://') || 
                       (i < text.length - 4 && text.substring(i, i + 4).toLowerCase() === 'www.'))) {
                // Add a URL segment
                if (urlIndex < urlSegments.length) {
                  result.push(urlSegments[urlIndex]);
                  i += urlSegments[urlIndex].length;
                  urlIndex++;
                } else {
                  i++;
                }
              } 
              else {
                // Add a text segment
                if (textIndex < processedSegments.length) {
                  result.push(processedSegments[textIndex]);
                  i += textSegments[textIndex].length;
                  textIndex++;
                } else {
                  i++;
                }
              }
            }
            
            return result.join('');
          };
          
          // Apply the replacement
          processedText = replaceKeywordWithLink(processedText, keyword, url, caseSensitive);
          
        } catch (error) {
          console.error(`Error processing keyword "${keyword}":`, error);
        }
      });
    }
    
    return processedText;
  };
  
  // For compatibility with existing code
  const processTextContent = renderText;
  const parseMarkdownLinks = renderText;
  
  // Reset autoplay state and analytics logged state when slug changes
  useEffect(() => {
    hasSetupAutoplay.current = false;
    setShowAutoplayVideo(false);
    setAnalyticsLogged(false);
  }, [slug]);

  // Detect client-side rendering
  useEffect(() => {
    setIsBrowser(true);
    // Mark hydration as complete
    setIsHydrated(true);
  }, []);
  
  // Track reading progress
  useEffect(() => {
    if (!isBrowser) return;
    
    const handleScroll = () => {
      // Calculate scroll progress based on entire document height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setReadingProgress(scrolled);
    };
    
    // Initial calculation
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBrowser]);
  
  // Function to log guide view to analytics
  async function logGuideView(guideId) {
    // Check if this view has already been logged in this session or component state
    const viewLogKey = `guide_view_logged_${guideId}`;
    
    // Use both component state and session storage to prevent duplicate calls
    if (typeof window !== 'undefined' && !sessionStorage.getItem(viewLogKey) && !analyticsLogged) {
      try {
        // Set both flags immediately to prevent any possibility of duplicate calls
        sessionStorage.setItem(viewLogKey, 'true');
        setAnalyticsLogged(true);
        
        // Add a small delay to ensure React has time to update state
        // This helps prevent race conditions in development mode
        await new Promise(resolve => setTimeout(resolve, 10));
        
        const response = await fetch('https://api.1ewis.com/analytics/guides/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            PK: guideId
          })
        });
        
        if (response.ok) {
          console.log('Guide view logged successfully');
        } else {
          console.error('Failed to log guide view: API returned error status');
        }
      } catch (analyticsErr) {
        console.error('Failed to log guide view:', analyticsErr);
      }
    } else {
      console.log('Guide view already logged, skipping analytics call');
    }
  }

  // Fetch guide data from API
  useEffect(() => {
    if (slug) {
      setLoading(true);
      console.log(`Fetching guide with slug: ${slug}`);
      
      // Use the direct API endpoint
      fetch(`https://api.1ewis.com/guides/fetch/${slug}`)
        .then(response => {
          console.log('API response status:', response.status);
          if (!response.ok) {
            throw new Error(`Guide not found: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Log the complete guide data for debugging
          console.log('Guide data received:', data);
          console.log('Interactive elements:', data.interactiveElements || {});
          
          // Debug guide sections and content
          if (data.sections && data.sections.length > 0) {
            console.log(`Guide has ${data.sections.length} sections`);
            data.sections.forEach((section, idx) => {
              console.log(`Section ${idx}: ${section.title}`);
              if (Array.isArray(section.content)) {
                console.log(`Section ${idx} has ${section.content.length} content blocks`);
                section.content.forEach((block, blockIdx) => {
                  console.log(`Content block ${idx}-${blockIdx} type: ${block.type}`);
                  if (block.type === 'paragraph' && block.text) {
                    console.log(`Paragraph ${idx}-${blockIdx} text preview:`, block.text.substring(0, 50) + '...');
                    // Check if paragraph contains any keywords
                    if (keywordsToLink && keywordsToLink.length > 0) {
                      keywordsToLink.forEach(({ keyword }) => {
                        if (block.text.toLowerCase().includes(keyword.toLowerCase())) {
                          console.log(`FOUND KEYWORD: "${keyword}" in paragraph ${idx}-${blockIdx}`);
                        }
                      });
                    }
                  } else if (block.type === 'list' && block.items) {
                    console.log(`List ${idx}-${blockIdx} has ${block.items.length} items`);
                  }
                });
              } else {
                console.log(`Section ${idx} has HTML content:`, typeof section.content);
              }
            });
          }
          
          // Check for quiz
          if (data.interactiveElements?.quiz) {
            console.log('Quiz found:', data.interactiveElements.quiz);
          } else {
            console.log('No quiz found in expected location');
          }
          
          setGuideData(data); // The API returns the guide directly, not nested
          setLoading(false);
          
          // Log the view after we've successfully fetched the guide data
          if (data && data.PK) {
            logGuideView(data.PK);
          } else if (data && data.id) {
            // Fallback to id if PK is not available
            logGuideView(data.id);
          }
        })
        .catch(err => {
          console.error('Error fetching guide:', err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [slug]);
  
  // Show autoplay video after 10 seconds of reading the guide (client-side only)
  useEffect(() => {
    if (slug && isBrowser && !hasSetupAutoplay.current && guideData?.interactiveElements?.videoPlayer) {
      hasSetupAutoplay.current = true;
      const showDelay = guideData.interactiveElements.videoPlayer.showDelay || 10000;
      
      const timer = setTimeout(() => {
        setShowAutoplayVideo(true);
      }, showDelay);
      
      return () => clearTimeout(timer);
    }
  }, [slug, isBrowser, guideData]);

  // Minimal fallback guide for error cases
  const fallbackGuide = {
    title: 'Guide Not Found',
    description: 'The requested guide could not be loaded.',
    slug: '',
    publishedDate: new Date().toISOString(),
    author: { name: 'System' },
    sections: [
      {
        id: 'error',
        title: 'Error',
        content: [{ type: 'paragraph', text: 'Please try again later or check the URL.' }]
      }
    ]
  };
  
  // Use the guide data from the API if available, otherwise use the fallback
  const currentGuide = guideData || fallbackGuide;
  
  // We're now using parseMarkdownLinks instead of renderTextWithLinks

  // Show loading state or error
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white justify-center items-center p-4">
        <Head>
          <title>Loading... | 1ewis</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="w-full max-w-4xl">
          {/* Skeleton Header */}
          <div className="animate-pulse mb-8">
            <div className="h-10 bg-gray-700 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded-md w-5/6"></div>
          </div>
          
          {/* Skeleton Image */}
          <div className="animate-pulse mb-8 w-full h-64 bg-gray-700 rounded-lg"></div>
          
          {/* Skeleton Content */}
          <div className="animate-pulse">
            <div className="h-6 bg-gray-700 rounded-md w-1/3 mb-6"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-700 rounded-md w-full"></div>
              <div className="h-4 bg-gray-700 rounded-md w-11/12"></div>
              <div className="h-4 bg-gray-700 rounded-md w-4/5"></div>
              <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            </div>
            
            <div className="h-6 bg-gray-700 rounded-md w-1/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded-md w-full"></div>
              <div className="h-4 bg-gray-700 rounded-md w-10/12"></div>
              <div className="h-4 bg-gray-700 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Head>
          <title>Guide Not Found | 1ewis.com</title>
        </Head>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Guide Not Found</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => router.push('/news/guides')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
            >
              Back to All Guides
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // currentGuide is already defined above

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Reading Progress Indicator */}
      {isBrowser && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
            style={{ width: `${readingProgress}%`, transition: 'width 0.2s ease-out' }}
            role="progressbar"
            aria-valuenow={readingProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Reading progress"
          />
        </div>
      )}
      <Head>
        {/* Primary Meta Tags */}
        <title>{currentGuide.title || 'Guide'} | 1ewis</title>
        <meta name="description" content={currentGuide.description || 'A comprehensive guide by 1ewis'} />
        <meta name="keywords" content={`${currentGuide.category || 'cryptocurrency'}, ${currentGuide.tags?.join(', ') || 'blockchain, crypto'}, guide, tutorial, 1ewis`} />
        <meta name="author" content={currentGuide.author?.name || '1ewis'} />
        <link rel="canonical" href={`https://1ewis.com/news/guides/${currentGuide.slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://1ewis.com/news/guides/${currentGuide.slug}`} />
        <meta property="og:title" content={`${currentGuide.title || 'Guide'} | 1ewis`} />
        <meta property="og:description" content={currentGuide.description || 'A comprehensive guide by 1ewis'} />
        <meta property="og:image" content={currentGuide.image || 'https://s3.1ewis.com/default-guide-image.webp'} />
        <meta property="article:published_time" content={currentGuide.publishedDate} />
        <meta property="article:author" content={currentGuide.author?.name || '1ewis'} />
        <meta property="article:section" content={currentGuide.category || 'Cryptocurrency'} />
        {currentGuide.tags?.map((tag, index) => (
          <meta key={`tag-${index}`} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewis" />
        <meta name="twitter:title" content={`${currentGuide.title || 'Guide'} | 1ewis`} />
        <meta name="twitter:description" content={currentGuide.description || 'A comprehensive guide by 1ewis'} />
        <meta name="twitter:image" content={currentGuide.image || 'https://s3.1ewis.com/default-guide-image.webp'} />
        <meta name="twitter:label1" content="Reading time" />
        <meta name="twitter:data1" content={`${currentGuide.readTime || '5'} min`} />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": currentGuide.title,
              "description": currentGuide.description,
              "image": currentGuide.image || 'https://s3.1ewis.com/default-guide-image.webp',
              "author": {
                "@type": "Person",
                "name": currentGuide.author?.name || '1ewis'
              },
              "publisher": {
                "@type": "Organization",
                "name": "1ewis",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://1ewis.com/logo.png"
                }
              },
              "datePublished": currentGuide.publishedDate,
              "dateModified": currentGuide.updatedDate || currentGuide.publishedDate,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://1ewis.com/news/guides/${currentGuide.slug}`
              }
            })
          }}
        />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Print Styles */}
        <style media="print">{`
          @page { margin: 2cm; }
          body { font-size: 12pt; }
          nav, footer, .no-print { display: none !important; }
          article { width: 100% !important; }
          img, pre { page-break-inside: avoid; }
          h2, h3 { page-break-after: avoid; }
          p, h2, h3 { orphans: 3; widows: 3; }
        `}</style>
        
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Head>
      
      {/* Skip to content link for accessibility */}
      <a 
        href={`#guide-${slug}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-700 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      
      <main id={`guide-${slug}`} className="flex-1" ref={mainContentRef}>
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
            <div className="absolute top-40 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[70px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          {/* Background animation elements */}
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          {/* Debug components removed */}
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <motion.button 
                  onClick={() => router.push('/news/guides')}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Guides
                </motion.button>
              </div>
              
              <div className="inline-flex items-center mb-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-4 py-2 rounded-full">
                <span className="text-cyan-300 font-medium">{currentGuide.category}</span>
              </div>
              
              <motion.h1 
                className="text-3xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {currentGuide.title}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {currentGuide.description}
              </motion.p>
              
              <motion.div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Published Date */}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>Published: {new Date(currentGuide.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                {/* Updated Date if different from published */}
                {currentGuide.updatedDate && currentGuide.updatedDate !== currentGuide.publishedDate && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    <span>Updated: {new Date(currentGuide.updatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
                
                {/* Read Time */}
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-cyan-400" />
                  <span>{currentGuide.readTime} min read</span>
                </div>
              </motion.div>
              
              {/* Tags */}
              {currentGuide.tags && currentGuide.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentGuide.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-800 text-cyan-300 text-xs font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Author Information */}
              {currentGuide.author && (
                <motion.div 
                  className="flex items-center mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {currentGuide.author.avatar && (
                    <img 
                      src={currentGuide.author.avatar} 
                      alt={currentGuide.author.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-white">{currentGuide.author.name}</p>
                    {currentGuide.author.bio && (
                      <p className="text-sm text-gray-400 mt-1">{currentGuide.author.bio}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">  
            {/* Main Content Column */}
            <div className="flex-1">
            {/* Featured Image */}
            <motion.div 
              className="mb-12 rounded-xl overflow-hidden shadow-2xl relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              <img 
                src={currentGuide.image || currentGuide.fallbackImage || "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide"} 
                alt={currentGuide.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  if (currentGuide.fallbackImage && e.target.src !== currentGuide.fallbackImage) {
                    e.target.onerror = null;
                    e.target.src = currentGuide.fallbackImage;
                  } else if (e.target.src !== "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide") {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide";
                  } else {
                    // If even the placeholder fails, remove the error handler to prevent loops
                    e.target.onerror = null;
                  }
                }}
              />
            </motion.div>
            
            {/* Guide Content */}
            <motion.div 
              className="prose prose-lg prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* If we have sections from the API, use those */}
              {currentGuide.sections ? (
                // Render sections from the API data
                currentGuide.sections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id || sectionIndex}
                    id={`section-${sectionIndex}`}
                    className="mb-12 scroll-mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * sectionIndex, duration: 0.6 }}
                  >
                    <motion.h2 
                      className="text-2xl font-bold mt-10 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 pb-2 border-b border-gray-800/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * sectionIndex, duration: 0.5 }}
                      whileInView={{ scale: [null, 1.02, 1] }}
                      viewport={{ once: true }}
                    >
                      {section.title}
                    </motion.h2>
                    
                    {/* Section image if available */}
                    {section.image && (
                      <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-gray-800/50 group relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Render content - either HTML string or array of paragraph objects */}
                    {Array.isArray(section.content) ? (
                      // Render array of paragraph objects
                      section.content.map((contentBlock, contentIndex) => {
                        if (contentBlock.type === 'paragraph') {
                          const processedHtml = processTextToHtml(contentBlock.text);
                          return (
                            <motion.div 
                              key={contentIndex} 
                              className="mb-6 text-gray-300 leading-relaxed tracking-wide"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * contentIndex, duration: 0.5 }}
                              whileInView={{ opacity: [null, 0.9, 1] }}
                              viewport={{ once: true, margin: "-50px" }}
                              dangerouslySetInnerHTML={{ __html: processedHtml }}
                            />
                          );
                        } else if (contentBlock.type === 'list') {
                          return (
                            <motion.ul
                              key={contentIndex}
                              className="list-disc pl-5 mb-8 text-gray-300 space-y-3"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * contentIndex, duration: 0.5 }}
                              whileInView={{ opacity: [null, 0.9, 1] }}
                              viewport={{ once: true, margin: "-50px" }}
                            >
                              {contentBlock.items.map((item, itemIndex) => {
                                const processedHtml = processTextToHtml(item);
                                return (
                                <motion.li 
                                  key={itemIndex} 
                                  className="ml-2 pl-2 marker:text-cyan-400"
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 * itemIndex + 0.1 * contentIndex, duration: 0.4 }}
                                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                                />
                              );
                              })}
                            </motion.ul>
                          );
                        } else if (contentBlock.type === 'callout') {
                          // Determine callout style based on type
                          const calloutStyles = {
                            info: "border-blue-600 bg-blue-900/20 text-blue-200",
                            warning: "border-amber-600 bg-amber-900/20 text-amber-200",
                            tip: "border-green-600 bg-green-900/20 text-green-200",
                            note: "border-purple-600 bg-purple-900/20 text-purple-200",
                            danger: "border-red-600 bg-red-900/20 text-red-200",
                          };
                          
                          const style = calloutStyles[contentBlock.calloutType || 'info'] || calloutStyles.info;
                          
                          return (
                            <motion.div
                              key={contentIndex}
                              className={`mb-8 p-4 border-l-4 rounded-r-lg ${style}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * contentIndex, duration: 0.5 }}
                            >
                              {contentBlock.title && (
                                <h4 className="font-bold mb-2">{contentBlock.title}</h4>
                              )}
                              <div dangerouslySetInnerHTML={{ __html: processTextToHtml(contentBlock.text) }} />
                            </motion.div>
                          );
                        } else if (contentBlock.type === 'code') {
                          return (
                            <motion.div
                              key={contentIndex}
                              className="mb-8 rounded-lg overflow-hidden bg-gray-900 border border-gray-700"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 * contentIndex, duration: 0.5 }}
                            >
                              {contentBlock.language && (
                                <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                                  <span className="text-sm font-mono text-gray-400">{contentBlock.language}</span>
                                  {contentBlock.copyable !== false && (
                                    <button 
                                      className="text-gray-400 hover:text-white transition-colors" 
                                      onClick={() => navigator.clipboard.writeText(contentBlock.code)}
                                      aria-label="Copy code"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              )}
                              <pre className="p-4 overflow-x-auto">
                                <code className="font-mono text-sm text-gray-300 whitespace-pre">{contentBlock.code}</code>
                              </pre>
                            </motion.div>
                          );
                        }
                        return null; // Handle other content types as needed
                      })
                    ) : (
                      // Render HTML content as string with keyword processing
                      (() => {
                        const processedHtml = processTextToHtml(section.content);
                        return (
                          <motion.div 
                            className="mb-6 text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            whileInView={{ opacity: [null, 0.9, 1] }}
                            viewport={{ once: true, margin: "-50px" }}
                            dangerouslySetInnerHTML={{ __html: processedHtml }}
                          />
                        );
                      })()
                    )}
                    
                    {/* Render token price tracker if section has one AND we're not using the global price tracker */}
                    {section.hasTokenPriceTracker && isHydrated && !currentGuide.interactiveElements?.priceTracker && (
                      <div className="my-8">
                        <CryptoPriceTracker 
                          coins={section.trackedTokens || ['bitcoin', 'ethereum']} 
                        />
                      </div>
                    )}
                    
                    {/* Render coin widget if section has one AND we're not using the global coin widget */}
                    {section.hasCoinWidget && isHydrated && !currentGuide.interactiveElements?.coinWidget && (
                      <div className="my-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                        <SingleTokenPrice 
                          tokenId={section.coinWidgetToken || 'bitcoin'}
                          showRefresh={true}
                          currency={'usd'}
                        />
                      </div>
                    )}
                    
                    {/* Render video player if section has one AND we're not using the global video player */}
                    {section.hasVideo && section.videoId && !currentGuide.interactiveElements?.videoPlayer && (
                      <motion.div
                        className="my-8 rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                      >
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            src={`https://www.youtube.com/embed/${section.videoId}${section.autoplay ? '?autoplay=1' : ''}`}
                            title={section.videoTitle || section.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                        {section.videoTitle && (
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">{section.videoTitle}</h3>
                          </div>
                        )}
                        {section.hasQuiz && section.quiz && isHydrated && !currentGuide.interactiveElements?.quiz && (
                          <motion.div className="mt-6 mb-4">
                            <h3 className="text-xl font-bold mb-3 text-cyan-300">{section.quiz.title || "Section Quiz"}</h3>
                            <InteractiveQuiz quizData={section.quiz} />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                    
                    {/* Render interactive elements from the section (AFTER content) */}
                    {section.interactiveElements && section.interactiveElements.length > 0 && (
                      <SectionInteractiveElements 
                        interactiveElements={section.interactiveElements} 
                        isHydrated={isHydrated} 
                      />
                    )}
                    
                    {/* Render quiz if section has one AND we're not rendering the quiz globally */}
                    {section.hasQuiz && section.quizId && isHydrated && !currentGuide.interactiveElements?.quiz && (
                      <motion.div
                        className="my-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        {/* Only render section-specific quizzes if they have a quizId and there's no global quiz */}
                        {(() => {
                          if (currentGuide.quizzes && Array.isArray(currentGuide.quizzes)) {
                            const quiz = currentGuide.quizzes.find(q => q.id === section.quizId);
                            if (quiz) {
                              console.log('Rendering section quiz from quizzes array:', quiz);
                              return <InteractiveQuiz quizData={quiz} />;
                            }
                          }
                          // Check if the quiz is directly embedded in the section
                          else if (section.quiz) {
                            console.log('Rendering quiz directly from section:', section.quiz);
                            return <InteractiveQuiz quizData={section.quiz} />;
                          }
                          return null;
                        })()}
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                // Fall back to the original content blocks
                currentGuide.content.map((block, index) => {
                  switch(block.type) {
                    case 'heading':
                      return (
                        <motion.h2 
                          key={index} 
                          className="text-2xl font-bold mt-8 mb-4 text-cyan-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                          {block.text}
                        </motion.h2>
                      );
                    case 'paragraph':
                      return (
                        <motion.div 
                          key={index} 
                          className="mb-6 text-gray-300 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          dangerouslySetInnerHTML={{ __html: processTextToHtml(block.text) }}
                        />
                      );
                    case 'list':
                      return (
                        <motion.ul 
                          key={index} 
                          className="mb-6 pl-6 space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                          {block.items.map((item, itemIndex) => (
                            <motion.li 
                              key={itemIndex} 
                              className="text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index + 0.05 * itemIndex, duration: 0.3 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </motion.ul>
                      );
                    case 'video':
                      return (
                        <motion.div
                          key={index}
                          className="mb-10 mt-6 rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          <div className="aspect-w-16 aspect-h-9">
                            <iframe
                              src={`https://www.youtube.com/embed/${block.youtubeId}`}
                              title={block.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-medium text-white">{block.title}</h3>
                          </div>
                        </motion.div>
                      );
                    case 'priceTracker':
                      return (
                        <motion.div
                          key={index}
                          className="mb-10 mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          {isHydrated && <CryptoPriceTracker />}
                        </motion.div>
                      );
                    case 'singleToken':
                      return (
                        <motion.div
                          key={index}
                          className="mb-10 mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          {isHydrated && <SingleTokenPrice tokenId={block.tokenId || 'bitcoin'} />}
                        </motion.div>
                      );
                    case 'calculator':
                      return (
                        <motion.div
                          key={index}
                          className="mb-10 mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          {isHydrated && <CryptoCalculator />}
                        </motion.div>
                      );
                    case 'quiz':
                      return (
                        <motion.div
                          key={index}
                          className="mb-10 mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          {isHydrated && block.quiz && <InteractiveQuiz quizData={block.quiz} />}
                          {isHydrated && !block.quiz && <div className="p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
                            <p className="text-red-300">Quiz data not available</p>
                          </div>}
                        </motion.div>
                      );
                    default:
                      return null;
                  }
                })
              )}
              
              {/* Video Player will be shown as a floating component in the bottom right corner */}
              
              {/* Price Tracker from guide data if available */}
              {currentGuide.interactiveElements?.priceTracker && isHydrated && (
                <motion.div
                  className="mt-12 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">Live Cryptocurrency Prices</h3>
                  <CryptoPriceTracker 
                    coins={currentGuide.interactiveElements.priceTracker.tokens || ['bitcoin', 'ethereum']}
                    refreshInterval={currentGuide.interactiveElements.priceTracker.refreshInterval || 60000}
                    defaultTimeframe={currentGuide.interactiveElements.priceTracker.defaultTimeframe || '24h'}
                  />
                </motion.div>
              )}
              
              {/* Coin Widget from guide data if available */}
              {currentGuide.interactiveElements?.coinWidget && isHydrated && (
                <motion.div
                  className="mt-12 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <SingleTokenPrice 
                    tokenId={currentGuide.interactiveElements.coinWidget.tokenId || 'bitcoin'}
                    currency={currentGuide.interactiveElements.coinWidget.currency || 'usd'}
                    showRefreshButton={currentGuide.interactiveElements.coinWidget.showRefreshButton !== false}
                    position={currentGuide.interactiveElements.coinWidget.position || 'top'}
                  />
                </motion.div>
              )}
              
              {/* Interactive Quiz from guide data if available */}
              {currentGuide.interactiveElements?.quiz && isHydrated && (
                <motion.div
                  className="mt-12 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-cyan-300">
                    {currentGuide.interactiveElements.quiz.title || "Test Your Knowledge"}
                  </h2>
                  {currentGuide.interactiveElements.quiz.description && (
                    <p className="text-gray-300 mb-6">{currentGuide.interactiveElements.quiz.description}</p>
                  )}
                  {/* Debug the quiz data */}
                  {console.log('Rendering quiz with data:', JSON.stringify(currentGuide.interactiveElements.quiz))}
                  <InteractiveQuiz 
                    quizData={currentGuide.interactiveElements.quiz}
                  />
                </motion.div>
              )}
              
              {/* Call to Action from guide data if available */}
              {currentGuide.interactiveElements?.callToAction && (
                <motion.div
                  className="mt-16 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  <div 
                    className="p-8 rounded-xl shadow-lg text-center"
                    style={{
                      backgroundColor: currentGuide.interactiveElements.callToAction.backgroundColor || '#3d14b4',
                      color: currentGuide.interactiveElements.callToAction.textColor || '#ffffff',
                      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)'
                    }}
                  >
                    <h2 className="text-3xl font-bold mb-4">{currentGuide.interactiveElements.callToAction.text}</h2>
                    <motion.button
                      className="mt-4 px-8 py-3 rounded-full font-medium text-lg shadow-lg transition-transform"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}
                      onClick={() => {
                        if (currentGuide.interactiveElements.callToAction.url) {
                          window.location.href = currentGuide.interactiveElements.callToAction.url;
                        }
                      }}
                    >
                      {currentGuide.interactiveElements.callToAction.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
            </div>
            
            {/* Sidebar */}
            <GuideSidebar guide={currentGuide} />
          </div>
        </section>
        
        {/* Related Guides */}
        {(currentGuide.relatedGuides && currentGuide.relatedGuides.length > 0) && (
          <section className="py-12 px-4 bg-gray-950">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-white">
                {currentGuide.relatedGuidesTitle || "Related Guides"}
              </h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {(currentGuide.relatedGuides || []).map((relatedGuide) => (
                <motion.div
                  key={relatedGuide.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-cyan-900/20 transition-all"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-cyan-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {relatedGuide.category}
                      </span>
                    </div>
                    <img 
                      src={relatedGuide.image || "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide"} 
                      alt={relatedGuide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (e.target.src !== "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide") {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide";
                        } else {
                          // If even the placeholder fails, remove the error handler to prevent loops
                          e.target.onerror = null;
                        }
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{relatedGuide.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{relatedGuide.description}</p>
                    <a 
                      href={`/news/guides/${relatedGuide.slug}`} 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Read Guide <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
              
              {/* View All Guides Link */}
              <motion.div
                className="flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-dashed border-gray-700 h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <a 
                  href="/news/guides" 
                  className="flex flex-col items-center justify-center p-6 h-full w-full"
                >
                  <span className="text-xl font-bold text-cyan-400 mb-2">View All Guides</span>
                  <span className="text-gray-400">Explore our complete collection</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
        )}
        {/* Feedback Mechanism */}
        <section className="py-12 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white text-center">Was this guide helpful?</h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                <button 
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors w-full md:w-auto"
                  aria-label="This guide was helpful"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Yes, it was helpful
                </button>
                
                <button 
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors w-full md:w-auto"
                  aria-label="This guide was not helpful"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  No, needs improvement
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium mb-4 text-white">Leave additional feedback</h3>
                <textarea 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  rows="4"
                  placeholder="Share your thoughts about this guide..."
                  aria-label="Additional feedback"
                ></textarea>
                <button 
                  className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                  aria-label="Submit feedback"
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Autoplay Video Player - only rendered client-side after hydration */}
      {isBrowser && isHydrated && (
        <AnimatePresence>
          {showAutoplayVideo && currentGuide.interactiveElements?.videoPlayer && (
            <motion.div
              className="fixed bottom-6 right-6 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Close button */}
                <button 
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full z-10 transition-colors"
                  onClick={() => setShowAutoplayVideo(false)}
                  aria-label="Close video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Video player */}
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentGuide.interactiveElements.videoPlayer.videoId}?autoplay=1&mute=1`}
                    title={currentGuide.interactiveElements.videoPlayer.title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                {/* Video title */}
                <div className="p-3">
                  <h4 className="text-sm font-medium text-white">{currentGuide.interactiveElements.videoPlayer.title || "Related Video"}</h4>
                  {currentGuide.interactiveElements.videoPlayer.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{currentGuide.interactiveElements.videoPlayer.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
