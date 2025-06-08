// Dynamic sitemap generator for questions
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async (req, res) => {
  // Set cache control header to ensure the sitemap is refreshed periodically
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  try {
    // Fetch questions from the API
    const response = await fetch('https://api.1ewis.com/sitemap/questions');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const questions = await response.json();
    
    // Transform the questions into sitemap entries
    const links = questions.map(question => ({
      url: new URL(question.url).pathname, // Extract just the pathname from the full URL
      lastmod: question.lastmod, // Use the lastmod date from the API
      changefreq: 'weekly', // Weekly is a good default for Q&A content
      priority: 0.8 // High priority but not as high as main pages
    }));

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: 'https://1ewis.com' });

    // Return a promise that resolves with your XML string
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    // Set the content header and send the XML to the browser
    res.setHeader('Content-Type', 'application/xml');
    res.write(xmlString);
    res.end();
  } catch (e) {
    console.log('Error generating questions sitemap:', e);
    res.status(500).end();
  }
};
