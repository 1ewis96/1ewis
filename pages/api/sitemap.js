// Dynamic sitemap generator
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async (req, res) => {
  // Set cache control header to ensure the sitemap is refreshed periodically
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  try {
    // Define all your site's URLs
    const links = [
      { url: '/', changefreq: 'weekly', priority: 1.0 },
      { url: '/bitrue', changefreq: 'weekly', priority: 0.9 },
      { url: '/portfolio', changefreq: 'weekly', priority: 0.9 },
      { url: '/ebooks', changefreq: 'monthly', priority: 0.8 },
      { url: '/mailing-list', changefreq: 'monthly', priority: 0.7 },
      { url: '/wallets/ledger', changefreq: 'monthly', priority: 0.8 },
      { url: '/wallets/metamask', changefreq: 'monthly', priority: 0.8 },
      { url: '/wallets/youhodler', changefreq: 'monthly', priority: 0.8 },
      { url: '/tools/tradingview', changefreq: 'monthly', priority: 0.8 },
      { url: '/tools/nordvpn', changefreq: 'monthly', priority: 0.8 },
      { url: '/tools/cointracking', changefreq: 'monthly', priority: 0.8 },
      { url: '/cards/revolut', changefreq: 'monthly', priority: 0.8 },
      { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
      { url: '/terms', changefreq: 'yearly', priority: 0.3 },
    ];

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
    console.log(e);
    res.status(500).end();
  }
};
