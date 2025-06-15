import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, ListVideo, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { videoCategories } from '../../data/videoCategories';
import PlaylistDisplay from '../../components/videos/PlaylistDisplay';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';
import AdminNavigation from '../../components/AdminNavigation';

function YouTubePlaylists() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [category, setCategory] = useState('education');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // No longer storing playlists in state or using JSON export

  // Helper function to extract playlist ID from URL
  const extractPlaylistId = (url) => {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      
      // Handle different YouTube URL formats
      if (urlObj.hostname.includes('youtube.com')) {
        // Format: https://www.youtube.com/playlist?list=PLAYLIST_ID
        const searchParams = new URLSearchParams(urlObj.search);
        const playlistId = searchParams.get('list');
        
        if (playlistId) {
          return playlistId;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  };

  const handleAddPlaylist = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (!playlistUrl) {
        throw new Error('Please enter a YouTube playlist URL');
      }
      
      if (!playlistTitle) {
        throw new Error('Please enter a title for the playlist');
      }
      
      // Get the API key from authUtils
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key found. Please log in again.');
      }
      
      // Extract playlist ID from URL
      const playlistId = extractPlaylistId(playlistUrl);
      
      if (!playlistId) {
        throw new Error('Invalid YouTube playlist URL');
      }
      
      // Send playlist data to our API
      const apiResponse = await fetch('https://api.1ewis.com/admin/create/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          playlistId: playlistId,
          title: playlistTitle,
          description: playlistDescription,
          category: category,
          createdAt: new Date().toISOString()
        })
      });
      
      if (!apiResponse.ok) {
        const apiError = await apiResponse.json();
        throw new Error(apiError.message || 'Failed to save playlist');
      }
      
      setSuccess(`Successfully added playlist: ${playlistTitle}`);
      setPlaylistUrl('');
      setPlaylistTitle('');
      setPlaylistDescription('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>YouTube Playlists | 1ewis Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              YouTube Playlists
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Add and manage YouTube playlists for your video page
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 text-white">Add Playlists to API</h2>
              
              <div className="bg-gray-800 rounded-lg p-8">
                <p className="text-gray-300">Playlists are now stored directly in the API database. Use the form to add new playlists to your collection.</p>
                <p className="text-gray-400 mt-4">Playlists added here will be available on the public videos page.</p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Playlist</h2>
                
                <form onSubmit={handleAddPlaylist}>

                  
                  <div className="mb-4">
                    <label htmlFor="playlistTitle" className="block text-sm font-medium text-gray-300 mb-1">
                      Playlist Title
                    </label>
                    <input
                      type="text"
                      id="playlistTitle"
                      value={playlistTitle}
                      onChange={(e) => setPlaylistTitle(e.target.value)}
                      placeholder="Enter playlist title"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="playlistDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Playlist Description
                    </label>
                    <textarea
                      id="playlistDescription"
                      value={playlistDescription}
                      onChange={(e) => setPlaylistDescription(e.target.value)}
                      placeholder="Enter playlist description"
                      rows="3"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="playlistUrl" className="block text-sm font-medium text-gray-300 mb-1">
                      YouTube Playlist URL
                    </label>
                    <input
                      type="url"
                      id="playlistUrl"
                      value={playlistUrl}
                      onChange={(e) => setPlaylistUrl(e.target.value)}
                      placeholder="https://www.youtube.com/playlist?list=..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="education">Education</option>
                      <option value="tutorial">Tutorials</option>
                      <option value="review">Reviews</option>
                      <option value="market">Market Analysis</option>
                      <option value="trading">Trading</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  )}
                  
                  {success && (
                    <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-lg">
                      <p className="text-sm text-green-300">{success}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Adding...</span>
                    ) : (
                      <>
                        <ListVideo className="h-5 w-5 mr-2" />
                        Add Playlist
                      </>
                    )}
                  </button>
                </form>
                
                {/* JSON export functionality removed */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAdminAuth(YouTubePlaylists);
