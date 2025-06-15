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
        <meta name="description" content="Watch the best cryptocurrency videos, tutorials, and educational content to help you navigate the crypto world." />
        <meta name="keywords" content="crypto videos, cryptocurrency tutorials, blockchain education, crypto youtube" />
        <link rel="canonical" href="https://1ewis.com/videos" />
      </Head>
      
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center mb-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 px-4 py-2 rounded-full">
                <Youtube className="text-red-500 w-5 h-5 mr-2" />
                <span className="text-red-300 font-medium">Educational Crypto Content</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                Crypto Videos & Tutorials
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Learn about cryptocurrency, blockchain, and Web3 with our curated collection of videos and tutorials.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Video */}
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
          ) : videos.length > 0 ? (
            <section className="mb-16">
              <FeaturedVideo video={videos[0]} />
            </section>
          ) : null}
          {/* Category Filter */}
          <CategorySelector 
            categories={videoCategories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />

          {/* Featured Playlists */}
          {!loading && !error && filteredPlaylists.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <ListVideo className="h-6 w-6 text-blue-400 mr-2" />
                <h2 className="text-2xl font-bold">Featured Playlists</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}
          
          {/* Videos Grid */}
          {!loading && !error && (
            filteredVideos.length > 0 ? (
              <section>
                <div className="flex items-center mb-6">
                  <PlaySquare className="h-6 w-6 text-purple-400 mr-2" />
                  <h2 className="text-2xl font-bold">Latest Videos</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </section>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No videos found for this category.</p>
              </div>
            )
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Floating CTA removed as requested */}
    </div>
  );
}
