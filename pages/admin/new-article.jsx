import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { Save, Image, Tag, Clock, X, Plus } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';

function NewArticle() {
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [publishType, setPublishType] = useState('publish'); // publish, draft, schedule
  const [scheduleDate, setScheduleDate] = useState('');

  // Mock categories
  const categories = [
    'Market Updates',
    'Guides',
    'Trending Topics',
    'Exchanges',
    'Wallets',
    'NFTs',
    'DeFi',
    'Regulation'
  ];

  useEffect(() => {
    // Initialize component
  }, []);

  // Add tag to the list
  const addTag = () => {
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  // Remove tag from the list
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log({
      title,
      content,
      category,
      tags,
      featuredImage,
      publishType,
      scheduleDate: publishType === 'schedule' ? scheduleDate : null
    });
    
    alert('Article saved successfully!');
    // Optionally redirect to the articles list
    // router.push('/admin');
  };



  return (
    <>
      <Head>
        <title>New Article | Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Create New Article
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Create and publish a new article to the news section
            </motion.p>
          </div>

          <motion.form 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Article Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Enter a compelling title"
                required
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {featuredImage ? (
                    <img 
                      src={featuredImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className="w-8 h-8 mx-auto text-gray-500" />
                      <span className="text-xs text-gray-500 mt-2 block">Upload Image</span>
                    </div>
                  )}
                </label>
                {featuredImage && (
                  <button 
                    type="button" 
                    onClick={() => setFeaturedImage(null)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Tags
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div 
                    key={tag} 
                    className="flex items-center bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-purple-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                Article Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Write your article content here..."
                required
              ></textarea>
            </div>

            {/* Publish Options */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-white">Publishing Options</h3>
              
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="publishType"
                    checked={publishType === 'publish'}
                    onChange={() => setPublishType('publish')}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">Publish Now</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="publishType"
                    checked={publishType === 'draft'}
                    onChange={() => setPublishType('draft')}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">Save as Draft</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="publishType"
                    checked={publishType === 'schedule'}
                    onChange={() => setPublishType('schedule')}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">Schedule</span>
                </label>
              </div>
              
              {publishType === 'schedule' && (
                <div className="mt-4">
                  <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-300 mb-2">
                    Publication Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduleDate"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    required={publishType === 'schedule'}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                {publishType === 'publish' ? 'Publish Article' : 
                 publishType === 'draft' ? 'Save Draft' : 'Schedule Article'}
              </button>
            </div>
          </motion.form>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(NewArticle);
