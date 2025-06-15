import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, Video, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdminNavigation from '../../components/AdminNavigation';
import withAdminAuth from '../../components/withAdminAuth';
// No longer importing static video data
import FeaturedVideo from '../../components/videos/FeaturedVideo';
import { getStoredApiKey } from '../../utils/authUtils';

function AddVideo() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [category, setCategory] = useState('education');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // No longer storing videos in state or using JSON export

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) return null;
    
    try {
      const urlObj = new URL(url);
      
      // Handle different YouTube URL formats
      if (urlObj.hostname.includes('youtube.com')) {
        // Format: https://www.youtube.com/watch?v=VIDEO_ID
        const searchParams = new URLSearchParams(urlObj.search);
        const videoId = searchParams.get('v');
        
        if (videoId) {
          return videoId;
        }
      } else if (urlObj.hostname === 'youtu.be') {
        // Format: https://youtu.be/VIDEO_ID
        return urlObj.pathname.substring(1);
      }
      
      return null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (!videoUrl) {
        throw new Error('Please enter a YouTube video URL');
      }
      
      if (!videoTitle) {
        throw new Error('Please enter a title for the video');
      }
      
      // Get the API key from authUtils
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key found. Please log in again.');
      }
      
      // Extract video ID from URL
      const videoId = extractVideoId(videoUrl);
      
      if (!videoId) {
        throw new Error('Invalid YouTube video URL');
      }
      
      // No longer checking if video already exists
      
      // Send video data to our API
      const apiResponse = await fetch('https://api.1ewis.com/admin/create/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          videoId: videoId,
          title: videoTitle,
          description: videoDescription,
          category: category,
          publishedAt: new Date().toISOString()
        })
      });
      
      if (!apiResponse.ok) {
        const apiError = await apiResponse.json();
        throw new Error(apiError.message || 'Failed to save video');
      }
      
      setSuccess(`Successfully added video: ${videoTitle}`);
      setVideoUrl('');
      setVideoTitle('');
      setVideoDescription('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Video | 1ewis Admin</title>
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
              Add YouTube Video
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Add individual YouTube videos to your collection
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 text-white">Add Videos to API</h2>
              
              <div className="bg-gray-800 rounded-lg p-8">
                <p className="text-gray-300">Videos are now stored directly in the API database. Use the form to add new videos to your collection.</p>
                <p className="text-gray-400 mt-4">Videos added here will be available on the public videos page.</p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Video</h2>
                
                <form onSubmit={handleAddVideo}>
                  <div className="mb-4">
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter the full YouTube video URL
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-300 mb-1">
                      Video Title
                    </label>
                    <input
                      type="text"
                      id="videoTitle"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="videoDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Video Description
                    </label>
                    <textarea
                      id="videoDescription"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Enter video description"
                      rows="3"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        <Video className="h-5 w-5 mr-2" />
                        Add Video
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

export default withAdminAuth(AddVideo);
