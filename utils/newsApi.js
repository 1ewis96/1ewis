// News API utility functions
const API_BASE_URL = 'https://api.1ewis.com';

/**
 * Fetch a list of news articles with optional filtering
 * @param {Object} options - Query options
 * @param {string} [options.tag] - Filter articles by tag
 * @param {number} [options.limit=10] - Maximum number of articles to return
 * @param {string} [options.nextToken] - Pagination token
 * @returns {Promise<Object>} - Articles and pagination token
 */
export async function fetchArticles({ tag, limit = 10, nextToken } = {}) {
  try {
    let url = `${API_BASE_URL}/news/articles?limit=${limit}`;
    
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }
    
    if (nextToken) {
      url += `&nextToken=${encodeURIComponent(nextToken)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    // Return mock data as fallback during development or when API is unavailable
    return {
      articles: [
        {
          id: "NEWS#2025-05-28#0001",
          slug: "ethereum-surges-etf-approval",
          title: "Ethereum Surges 15%",
          summary: "ETH jumps 15% after ETF approval...",
          thumbnailUrl: "https://placeholder.com/ethereum-etf.jpg",
          publishedAt: "2025-05-28T14:30:00Z",
          readTime: "3 min",
          tags: ["Ethereum", "ETF"],
          isFeatured: true
        },
        {
          id: "NEWS#2025-05-27#0001",
          slug: "bitcoin-new-ath",
          title: "Bitcoin Reaches New All-Time High",
          summary: "Bitcoin has surpassed previous records, reaching a new all-time high amid increased institutional adoption.",
          thumbnailUrl: "https://placeholder.com/btc-ath.jpg",
          publishedAt: "2025-05-27T10:15:00Z",
          readTime: "4 min",
          tags: ["Bitcoin", "Markets"],
          isFeatured: false
        },
        {
          id: "NEWS#2025-05-26#0002",
          slug: "defi-market-growth",
          title: "DeFi Market Cap Reaches $500B",
          summary: "The total value locked in decentralized finance protocols has reached an all-time high of $500 billion.",
          thumbnailUrl: "https://placeholder.com/defi-growth.jpg",
          publishedAt: "2025-05-26T08:45:00Z",
          readTime: "5 min",
          tags: ["DeFi", "Markets"],
          isFeatured: false
        }
      ],
      nextToken: "eyJQSyI6..."
    };
  }
}

/**
 * Fetch a single article by ID
 * @param {string} id - Article ID in format YYYY-MM-DD-XXXX
 * @returns {Promise<Object>} - Article data
 */
export async function fetchArticleById(id) {
  try {
    if (!id) {
      throw new Error('Article ID is required');
    }
    
    const response = await fetch(`${API_BASE_URL}/news/article/${id}`);
    
    if (response.status === 404) {
      throw new Error('Article not found');
    }
    
    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    // Return mock data as fallback during development or when API is unavailable
    return {
      PK: `NEWS#${id.split('-').slice(0, 3).join('-')}#${id.split('-')[3]}`,
      SK: `ARTICLE#${id.split('-')[3]}`,
      title: "Ethereum Surges 15% Following ETF Approval by SEC",
      slug: "ethereum-surges-etf-approval",
      author: {
        id: "AUTH#john-doe",
        name: "John Doe"
      },
      publishedAt: "2025-05-28T14:30:00Z",
      summary: "Ethereum price jumps significantly after the SEC approves the first Ethereum ETF, marking a major milestone for the cryptocurrency.",
      content: `
        <p>In a landmark decision that sent shockwaves through the cryptocurrency market, the U.S. Securities and Exchange Commission (SEC) has officially approved the first Ethereum Exchange-Traded Fund (ETF), leading to a dramatic 15% surge in Ethereum's price.</p>
        
        <p>The approval, which came after months of speculation and regulatory deliberation, marks a significant milestone for the world's second-largest cryptocurrency by market capitalization. Industry experts view this development as a major step toward mainstream adoption of Ethereum and the broader cryptocurrency ecosystem.</p>
        
        <h2>Market Impact</h2>
        
        <p>Following the announcement, Ethereum's price jumped from $8,200 to nearly $9,500 within hours, representing one of the largest single-day gains for the cryptocurrency in recent months. Trading volume also spiked significantly across major exchanges.</p>
        
        <p>"This is a watershed moment for Ethereum and the entire crypto industry," said Jane Smith, Chief Analyst at Crypto Research Institute. "The ETF approval provides institutional investors with a regulated vehicle to gain exposure to Ethereum without the complexities of direct ownership."</p>
        
        <h2>Institutional Interest</h2>
        
        <p>Major financial institutions have already expressed interest in the newly approved Ethereum ETF. BlackRock, Fidelity, and VanEck are among the asset management giants preparing to launch their own Ethereum ETF products in the coming weeks.</p>
        
        <p>Market analysts predict that these ETFs could attract billions in institutional capital that previously remained on the sidelines due to regulatory concerns and custody challenges.</p>
        
        <h2>Broader Implications</h2>
        
        <p>The approval of an Ethereum ETF follows the successful launch of Bitcoin ETFs earlier this year, which have already accumulated over $50 billion in assets under management. This regulatory progression suggests a growing acceptance of cryptocurrencies as a legitimate asset class by U.S. financial authorities.</p>
        
        <p>Furthermore, this development is expected to accelerate innovation in the Ethereum ecosystem, particularly in areas like decentralized finance (DeFi), non-fungible tokens (NFTs), and layer-2 scaling solutions.</p>
        
        <p>As institutional adoption continues to grow, many industry participants are optimistic about the long-term prospects for Ethereum and its potential to transform various aspects of the financial system.</p>
      `,
      tags: ["Ethereum", "ETF", "SEC", "Markets"],
      thumbnailUrl: "https://placeholder.com/ethereum-etf-approval.jpg",
      readTime: "3 min",
      isFeatured: true,
      source: { 
        name: "CryptoTimes", 
        url: "https://cryptotimes.example.com" 
      },
      sponsored: {
        isSponsored: false,
        sponsorName: "",
        disclosure: ""
      }
    };
  }
}

/**
 * Format a published date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
export function formatPublishedDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Extract article ID from PK
 * @param {string} pk - Article PK in format NEWS#YYYY-MM-DD#XXXX
 * @returns {string} - Article ID in format YYYY-MM-DD-XXXX
 */
export function extractArticleId(pk) {
  if (!pk || typeof pk !== 'string') return '';
  
  // Extract date and ID from PK format: NEWS#2025-05-28#0001
  const parts = pk.split('#');
  if (parts.length !== 3) return '';
  
  const date = parts[1]; // 2025-05-28
  const id = parts[2];   // 0001
  
  return `${date}-${id}`; // 2025-05-28-0001
}
