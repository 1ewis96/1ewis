// RSS feed generator for 1ewis.com news articles
import { fetchArticles } from '../../../utils/newsApi';

export default async (req, res) => {
  // Set cache control header to ensure the feed is refreshed periodically
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600');
  
  try {
    // Fetch the latest articles (increase limit for RSS feed)
    const { articles } = await fetchArticles({ limit: 20 });
    
    if (!articles || !Array.isArray(articles)) {
      throw new Error('Failed to fetch articles or invalid response format');
    }
    
    // Format the current date for the RSS feed
    const now = new Date();
    const pubDate = now.toUTCString();
    
    // Start building the RSS XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
<channel>
  <title>1ewis.com News</title>
  <atom:link href="https://1ewis.com/news/feed.xml" rel="self" type="application/rss+xml" />
  <link>https://1ewis.com/news</link>
  <description>Latest cryptocurrency news, market analysis, and insights from 1ewis.com</description>
  <lastBuildDate>${pubDate}</lastBuildDate>
  <language>en-US</language>
  <sy:updatePeriod>hourly</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  <image>
    <url>https://1ewis.com/logo.png</url>
    <title>1ewis.com News</title>
    <link>https://1ewis.com/news</link>
  </image>
`;
    
    // Add each article as an item in the feed
    articles.forEach(article => {
      // Extract the article ID for the link
      const articleId = article.id ? 
        (article.id.includes('#') ? extractArticleId(article.id) : article.id) : 
        '';
      
      // Format the publication date
      const itemPubDate = article.publishedAt ? 
        new Date(article.publishedAt).toUTCString() : 
        pubDate;
      
      // Create the article URL in the specified format
      const articleUrl = `https://1ewis.com/news/article/${articleId}/`;
      
      // Create a safe description (summary) with HTML entities escaped
      const safeDescription = article.summary ? 
        article.summary.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;') : 
        '';
      
      // Add tags as categories if available
      let categories = '';
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => {
          categories += `    <category><![CDATA[${tag}]]></category>\n`;
        });
      }
      
      // Add the item to the XML
      xml += `  <item>
    <title><![CDATA[${article.title || 'Untitled Article'}]]></title>
    <link>${articleUrl}</link>
    <pubDate>${itemPubDate}</pubDate>
    <guid isPermaLink="false">${article.id || articleUrl}</guid>
    <description><![CDATA[${safeDescription}]]></description>
${categories}    <enclosure url="${article.thumbnailUrl || ''}" type="image/jpeg" />
  </item>
`;
    });
    
    // Close the RSS XML
    xml += `</channel>
</rss>`;
    
    // Set the content header and send the XML
    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
  } catch (e) {
    console.error('Error generating RSS feed:', e);
    res.status(500).end('Error generating feed');
  }
};

// Helper function to extract article ID from PK format
function extractArticleId(pk) {
  if (!pk || typeof pk !== 'string') return '';
  
  // Extract date and ID from PK format: NEWS#2025-05-28#0001
  const parts = pk.split('#');
  if (parts.length !== 3) return '';
  
  const date = parts[1]; // 2025-05-28
  const id = parts[2];   // 0001
  
  return `${date}-${id}`; // 2025-05-28-0001
}
