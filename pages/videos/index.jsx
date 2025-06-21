import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import VideoCard from '../../components/videos/VideoCard';
import PlaylistCard from '../../components/videos/PlaylistCard';
import CategorySelector from '../../components/videos/CategorySelector';
import FeaturedVideo from '../../components/videos/FeaturedVideo';
// FloatingCTA removed as requested
import { videoCategories } from '../../data/videoCategories';
import { Youtube, PlaySquare, ListVideo, Loader2 } from 'lucide-react';

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  // FloatingCTA state removed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos and playlists from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch videos
        const videosResponse = await fetch('https://api.1ewis.com/videos');
        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }
        const videosData = await videosResponse.json();
        
        // Fetch playlists
        const playlistsResponse = await fetch('https://api.1ewis.com/videos/playlists');
        if (!playlistsResponse.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const playlistsData = await playlistsResponse.json();
        
        // Process videos data
        const processedVideos = videosData.videos.map(video => ({
          id: video.PK,
          videoId: video.PK, // Using PK as videoId
          title: video.title,
          description: video.description,
          thumbnail: `https://img.youtube.com/vi/${video.PK}/maxresdefault.jpg`,
          channelName: '1ewis',
          publishedAt: video.publishedAt,
          category: video.category,
          duration: '10:00' // Default duration since it's not provided in the API
        }));
        
        // Process playlists data
        const processedPlaylists = playlistsData.playlists.map(playlist => {
          // Extract playlist ID from PK (format: PLAYLIST#PLYA85ojmB_kmpkD8jKEt8nCtT8tyGyM-r)
          const playlistId = playlist.PK.split('#')[1];
          
          // Get the thumbnail from the API response if available, otherwise use a default
          return {
            id: playlistId,
            playlistId: playlistId,
            title: playlist.title,
            description: playlist.description,
            thumbnail: playlist.thumbnail || `https://i.ytimg.com/vi/default/hqdefault.jpg`,
            channelName: '1ewis',
            category: playlist.category,
            createdAt: playlist.createdAt
          };
        });
        
        setVideos(processedVideos);
        setPlaylists(processedPlaylists);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter videos and playlists when category changes or data is loaded
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredVideos(videos);
      setFilteredPlaylists(playlists);
    } else {
      setFilteredVideos(videos.filter(video => video.category === activeCategory));
      setFilteredPlaylists(playlists.filter(playlist => playlist.category === activeCategory));
    }
  }, [activeCategory, videos, playlists]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Crypto Videos & Tutorials | 1ewis.com</title>
        <meta name="description" content="Watch the best cryptocurrency videos, tutorials, and educational content to help you navigate the crypto world. Learn about Bitcoin, Ethereum, DeFi, NFTs, and more." />
        <meta name="keywords" content="crypto videos, cryptocurrency tutorials, blockchain education, bitcoin videos, ethereum tutorials, defi education, crypto youtube" />
        <link rel="canonical" href="https://1ewis.com/videos" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/videos" />
        <meta property="og:title" content="Crypto Videos & Tutorials | 1ewis.com" />
        <meta property="og:description" content="Watch the best cryptocurrency videos, tutorials, and educational content to help you navigate the crypto world." />
        <meta property="og:image" content="https://1ewis.com/images/og-videos.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://1ewis.com/videos" />
        <meta property="twitter:title" content="Crypto Videos & Tutorials | 1ewis.com" />
        <meta property="twitter:description" content="Watch the best cryptocurrency videos, tutorials, and educational content to help you navigate the crypto world." />
        <meta property="twitter:image" content="https://1ewis.com/images/og-videos.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        {/* Video structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': videos.slice(0, 10).map((video, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'item': {
                '@type': 'VideoObject',
                '@id': `https://1ewis.com/video/${video.videoId}`,
                'name': video.title,
                'description': video.description,
                'thumbnailUrl': video.thumbnail,
                'uploadDate': video.publishedAt,
                'duration': 'PT10M', // Default duration format for Schema.org
                'embedUrl': `https://www.youtube.com/embed/${video.videoId}`,
                'contentUrl': `https://www.youtube.com/watch?v=${video.videoId}`,
                'publisher': {
                  '@type': 'Organization',
                  'name': '1ewis',
                  'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://1ewis.com/images/logo.png',
                    'width': '112',
                    'height': '112'
                  }
                }
              }
            }))
          })}
        </script>
      </Head>
      
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background animation elements */}
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] -z-10"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center mb-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Youtube className="text-red-500 w-5 h-5 mr-2" />
                </motion.div>
                <span className="text-red-300 font-medium">Educational Crypto Content</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Crypto Videos & Tutorials
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Learn about cryptocurrency, blockchain, and Web3 with our curated collection of videos and tutorials.
              </motion.p>
              
              {/* YouTube Subscribe Button */}
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.a 
                  href="https://youtube.com/@1ewis_com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 rounded-lg bg-red-800/90 text-white shadow-md hover:bg-red-700/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
                  </svg>
                  <span className="font-bold">Subscribe @1ewis_com</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Video - Only show when not loading */}
          {!loading && !error && videos.length > 0 && (
            <section className="mb-16">
              <FeaturedVideo video={videos[0]} />
            </section>
          )}
          
          {/* Category Filter - Always show this */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CategorySelector 
              categories={videoCategories} 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </motion.div>
          
          {/* Loading spinner - Now positioned below categories */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              <span className="ml-3 text-xl text-gray-300">Loading videos...</span>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 mb-16">
              <p className="text-red-300 text-center">{error}</p>
              <p className="text-gray-400 text-center mt-2">Please try refreshing the page.</p>
            </div>
          ) : null}

          {/* Featured Playlists */}
          {!loading && !error && filteredPlaylists.length > 0 && (
            <motion.section 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                className="flex items-center mb-6"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ListVideo className="h-6 w-6 text-blue-400 mr-2" />
                </motion.div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Featured Playlists</h2>
              </motion.div>
              
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
                {filteredPlaylists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <PlaylistCard playlist={playlist} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
          
          {/* Videos Grid */}
          {!loading && !error && (
            filteredVideos.length > 0 ? (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <PlaySquare className="h-6 w-6 text-purple-400 mr-2" />
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Latest Videos</h2>
                </motion.div>
                
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
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-400 text-lg">No videos found for this category.</p>
              </motion.div>
            )
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Floating CTA removed as requested */}
    </div>
  );
}
