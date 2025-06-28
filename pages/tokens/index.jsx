import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Search, Eye, ShoppingCart } from 'lucide-react';
import Navigation from '../../components/navigation';
import Footer from '../../components/Footer';

export default function TokensPage() {
  // State for sorting and pagination
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const tokensPerPage = 10;
  
  // Dummy data for tokens
  const [tokens, setTokens] = useState([
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 64253.12,
      priceChange24h: 2.4,
      marketCap: 1258000000000,
      volume24h: 32500000000,
      image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3478.65,
      priceChange24h: 1.8,
      marketCap: 418000000000,
      volume24h: 18700000000,
      image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    {
      id: 'solana',
      rank: 3,
      name: 'Solana',
      symbol: 'SOL',
      price: 142.87,
      priceChange24h: 5.2,
      marketCap: 62500000000,
      volume24h: 3800000000,
      image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
    },
    {
      id: 'cardano',
      rank: 4,
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.58,
      priceChange24h: -1.3,
      marketCap: 20500000000,
      volume24h: 980000000,
      image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
    },
    {
      id: 'ripple',
      rank: 5,
      name: 'XRP',
      symbol: 'XRP',
      price: 0.62,
      priceChange24h: 0.9,
      marketCap: 34800000000,
      volume24h: 1250000000,
      image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
    },
    {
      id: 'polkadot',
      rank: 6,
      name: 'Polkadot',
      symbol: 'DOT',
      price: 7.84,
      priceChange24h: 3.1,
      marketCap: 10200000000,
      volume24h: 520000000,
      image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png'
    },
    {
      id: 'dogecoin',
      rank: 7,
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.12,
      priceChange24h: 4.5,
      marketCap: 17300000000,
      volume24h: 890000000,
      image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png'
    },
  ]);

  // Format large numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return '$' + (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return '$' + (num / 1000).toFixed(2) + 'K';
    } else {
      return '$' + num.toFixed(2);
    }
  };

  // Format price with appropriate precision
  const formatPrice = (price) => {
    if (price < 0.01) return '$' + price.toFixed(6);
    if (price < 1) return '$' + price.toFixed(4);
    if (price < 10) return '$' + price.toFixed(3);
    if (price < 1000) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
  
  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort tokens
  const filteredTokens = tokens.filter(token => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query)
    );
  });
  
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rank':
        comparison = a.rank - b.rank;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'priceChange24h':
        comparison = a.priceChange24h - b.priceChange24h;
        break;
      case 'marketCap':
        comparison = a.marketCap - b.marketCap;
        break;
      case 'volume24h':
        comparison = a.volume24h - b.volume24h;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Pagination logic
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = sortedTokens.slice(indexOfFirstToken, indexOfLastToken);
  const totalPages = Math.ceil(sortedTokens.length / tokensPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Cryptocurrency Market | 1ewis.com</title>
        <meta name="description" content="View the latest cryptocurrency prices, market cap, and trading volume." />
      </Head>
      
      <Navigation />
      
      <main className="flex-grow pt-24"> {/* Added padding-top to account for fixed navbar */}
        <div className="container mx-auto px-6 md:px-16 py-12">
        <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market</h1>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for a cryptocurrency..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        
        {/* Tokens table */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-800/50">
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('rank')}
                  >
                    # {sortBy === 'rank' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortBy === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('priceChange24h')}
                  >
                    24h % {sortBy === 'priceChange24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('marketCap')}
                  >
                    Market Cap {sortBy === 'marketCap' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('volume24h')}
                  >
                    Volume (24h) {sortBy === 'volume24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {currentTokens.map((token) => (
                  <tr key={token.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{token.rank}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link href={`/token/${token.symbol.toLowerCase()}`} className="flex items-center">
                        <img src={token.image} alt={token.name} className="w-6 h-6 mr-2 rounded-full" />
                        <div>
                          <div className="font-medium text-white">{token.name}</div>
                          <div className="text-xs text-gray-400">{token.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-white">
                      {formatPrice(token.price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.priceChange24h >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(token.priceChange24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                      {formatNumber(token.marketCap)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                      {formatNumber(token.volume24h)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center space-x-2">
                        <Link 
                          href={`/token/${token.symbol.toLowerCase()}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-blue-500 text-xs font-medium rounded text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-200"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Link>
                        <Link 
                          href={`/buy/${token.symbol.toLowerCase()}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-green-500 text-xs font-medium rounded text-green-500 bg-transparent hover:bg-green-500 hover:text-white transition-colors duration-200"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 py-4 bg-gray-800/30 border-t border-gray-700">
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                Prev
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      </main>
      
      <Footer />
    </div>
  );
}
