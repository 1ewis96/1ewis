// API route handler for guides sitemap
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async (req, res) => {
  // Set cache control header to ensure the sitemap is refreshed periodically
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  try {
    // Fetch guides from the API
    const response = await fetch('https://api.1ewis.com/sitemap/guides');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const guides = await response.json();
    
    // Transform the guides into sitemap entries
    const links = guides.map(guide => ({
      url: guide.url, // Use the full URL from the API
      lastmod: guide.lastmod, // Use the lastmod date from the API
      changefreq: 'weekly', // Weekly is a good default for guide content
      priority: 0.9 // High priority for educational content
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
    console.log('Error generating guides sitemap:', e);
    res.status(500).end();
  }
};
