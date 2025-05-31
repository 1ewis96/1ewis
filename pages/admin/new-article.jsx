import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AdminNavigation from '../../components/AdminNavigation';
import { Save, Image, Tag, Clock, X, Plus, Link, User, Eye, Heart, DollarSign, Globe, FileText, AlertTriangle } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { withApiKey } from '../../utils/authUtils';

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function NewArticle() {
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [readTime, setReadTime] = useState('3 min');
  const [language, setLanguage] = useState('en');
  const [isFeatured, setIsFeatured] = useState(false);
  const [publishType, setPublishType] = useState('publish'); // publish, draft, schedule
  const [scheduleDate, setScheduleDate] = useState('');
  
  // Author info
  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState('');
  
  // Source info
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  
  // Sponsored content
  const [isSponsored, setIsSponsored] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorDisclosure, setSponsorDisclosure] = useState('This article was sponsored by the sponsor. Opinions are the author\'s own.');

  // Categories state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  // Quill editor modules and formats configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };
  
  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'blockquote', 'code-block',
  ];

  // Fetch categories from API
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    
    try {
      const response = await fetch('https://api.1ewis.com/news/categories');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check if categories exist and is an array
      if (data.categories && Array.isArray(data.categories)) {
        // Map the categories to extract categoryName
        setCategories(data.categories.map(cat => cat.categoryName || cat));
      } else {
        // Handle empty or invalid response
        setCategories([]);
        console.warn('No categories found in API response or invalid format');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategoriesError('Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    // Initialize component and fetch categories
    fetchCategories();
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

  // State to store the actual image file
  const [imageFile, setImageFile] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Store the file object for upload
      setImageFile(e.target.files[0]);
      // Create a preview URL
      setFeaturedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Generate slug from title
  const generateSlug = () => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(slug);
    }
  };

  // Calculate read time based on content length
  const calculateReadTime = () => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200)); // Assuming 200 words per minute reading speed
      setReadTime(`${minutes} min`);
    } else {
      setReadTime('1 min');
    }
  };
  
  // Function to convert a file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Update slug and read time when title or content changes
  useEffect(() => {
    generateSlug();
  }, [title]);

  useEffect(() => {
    calculateReadTime();
  }, [content]);

  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Generate current timestamps
      const now = new Date().toISOString();
      const dateStr = now.split('T')[0].replace(/-/g, '');
      const articleId = `${dateStr}#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Create article object with all fields
      const articleData = {
        title,
        content,
        summary,
        slug: slug || generateSlug(),
        category,
        tags,
        thumbnailUrl: thumbnailUrl || 'https://cdn.example.com/thumbnails/default.jpg',
        readTime,
        language,
        isFeatured,
        publishedAt: publishType === 'schedule' ? new Date(scheduleDate).toISOString() : now,
        updatedAt: now,
        PK: `NEWS#${articleId}`,
        SK: `ARTICLE#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        author: {
          name: authorName || 'Admin',
          id: authorId || 'AUTH#admin'
        },
        sponsored: isSponsored ? {
          sponsorName,
          disclosure: sponsorDisclosure,
          isSponsored: true
        } : null,
        source: sourceName ? {
          name: sourceName,
          url: sourceUrl
        } : null,
        likes: 0,
        views: 0,
        publishType
      };
      
      // Get the API key from authUtils
      const { getStoredApiKey } = require('../../utils/authUtils');
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key found. Please log in again.');
      }
      
      // If we have an image file, convert it to base64
      if (imageFile) {
        try {
          // Convert the image file to base64
          const base64Image = await convertFileToBase64(imageFile);
          
          // Extract the actual base64 data without the prefix (data:image/jpeg;base64,)
          const base64Data = base64Image.split(',')[1];
          
          // Add the base64 image data to the article data using the field name expected by the backend
          articleData.thumbnailBase64 = base64Data;
          
        } catch (imageError) {
          console.error('Error converting image to base64:', imageError);
          // Continue with article creation even if image conversion fails
        }
      }
      
      // Send the article data as JSON to the API
      const response = await fetch('https://api.1ewis.com/create/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(articleData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Article created successfully:', result);
      
      setSubmitSuccess(true);
      
      // Reset form if needed
      if (publishType !== 'draft') {
        // Reset form fields
        setTitle('');
        setContent('');
        setSummary('');
        setCategory('');
        setTags([]);
        setFeaturedImage(null);
        setImageFile(null); // Clear the image file
        setThumbnailUrl('');
        setSlug('');
        setIsSponsored(false);
        setSponsorName('');
        setIsFeatured(false);
      }
      
    } catch (error) {
      console.error('Error creating article:', error);
      setSubmitError(error.message || 'An error occurred while creating the article');
    } finally {
      setIsSubmitting(false);
    }
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
                disabled={categoriesLoading}
              >
                <option value="">{categoriesLoading ? 'Loading categories...' : categoriesError ? 'Error loading categories' : 'Select a category'}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {categoriesError && (
                <p className="mt-2 text-red-400 text-sm">{categoriesError}</p>
              )}
              {categoriesLoading && (
                <p className="mt-2 text-blue-400 text-sm flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  Loading categories...
                </p>
              )}
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

            {/* Summary */}
            <div className="space-y-2">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-300">
                Article Summary
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Write a short summary of the article (will be used for previews)"
                required
              ></textarea>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                Article Content
              </label>
              <div className="rich-text-editor">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your article content here..."
                  className="bg-black/60 rounded-lg text-white"
                  style={{ height: '300px' }}
                />
              </div>
              <style jsx global>{`
                .rich-text-editor .ql-container {
                  border-bottom-left-radius: 0.5rem;
                  border-bottom-right-radius: 0.5rem;
                  background: rgba(0, 0, 0, 0.6);
                  border-color: rgb(55, 65, 81);
                  color: white;
                  font-family: inherit;
                  min-height: 250px;
                }
                .rich-text-editor .ql-toolbar {
                  border-top-left-radius: 0.5rem;
                  border-top-right-radius: 0.5rem;
                  background: rgba(30, 30, 30, 0.8);
                  border-color: rgb(55, 65, 81);
                  color: white;
                }
                .rich-text-editor .ql-toolbar .ql-stroke {
                  stroke: #9ca3af;
                }
                .rich-text-editor .ql-toolbar .ql-fill {
                  fill: #9ca3af;
                }
                .rich-text-editor .ql-toolbar .ql-picker {
                  color: #9ca3af;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                  color: rgba(156, 163, 175, 0.6);
                  font-style: normal;
                }
                .rich-text-editor .ql-editor {
                  min-height: 250px;
                }
              `}</style>
            </div>

            {/* URL Slug */}
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                URL Slug
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="article-url-slug"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* External Image URL */}
            <div className="space-y-2">
              <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-300">
                Thumbnail URL (External)
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Author Information */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Author Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="authorId" className="block text-sm font-medium text-gray-300 mb-2">
                    Author ID
                  </label>
                  <input
                    type="text"
                    id="authorId"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="AUTH#john-doe"
                  />
                </div>
              </div>
            </div>

            {/* Source Information */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Source Information (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sourceName" className="block text-sm font-medium text-gray-300 mb-2">
                    Source Name
                  </label>
                  <input
                    type="text"
                    id="sourceName"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="CryptoTimes"
                  />
                </div>
                <div>
                  <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    Source URL
                  </label>
                  <input
                    type="url"
                    id="sourceUrl"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    placeholder="https://cryptotimes.com/article"
                  />
                </div>
              </div>
            </div>

            {/* Sponsored Content */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Sponsored Content
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isSponsored}
                    onChange={() => setIsSponsored(!isSponsored)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              {isSponsored && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-300 mb-2">
                      Sponsor Name
                    </label>
                    <input
                      type="text"
                      id="sponsorName"
                      value={sponsorName}
                      onChange={(e) => setSponsorName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="BlockFi"
                      required={isSponsored}
                    />
                  </div>
                  <div>
                    <label htmlFor="sponsorDisclosure" className="block text-sm font-medium text-gray-300 mb-2">
                      Disclosure Text
                    </label>
                    <textarea
                      id="sponsorDisclosure"
                      value={sponsorDisclosure}
                      onChange={(e) => setSponsorDisclosure(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="This article was sponsored by [Sponsor]. Opinions are the author's own."
                      required={isSponsored}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-white">Additional Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="readTime" className="block text-sm font-medium text-gray-300 mb-2">
                    Read Time
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="readTime"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="3 min"
                    />
                    <button
                      type="button"
                      onClick={calculateReadTime}
                      className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Calculate
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(!isFeatured)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-300">Feature this article (will appear in featured section)</span>
                </label>
              </div>
            </div>

            {/* Publish Options */}
            <div className="space-y-4 bg-black/40 p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Publishing Options
              </h3>
              
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
                    className="px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    required={publishType === 'schedule'}
                  />
                </div>
              )}
            </div>

            {/* Success/Error Messages */}
            {submitSuccess && (
              <div className="p-4 mb-6 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Article saved successfully!
                </p>
              </div>
            )}
            
            {submitError && (
              <div className="p-4 mb-6 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
                <p className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${isSubmitting ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {publishType === 'publish' ? 'Publishing...' : 
                     publishType === 'draft' ? 'Saving Draft...' : 'Scheduling...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {publishType === 'publish' ? 'Publish Article' : 
                     publishType === 'draft' ? 'Save Draft' : 'Schedule Article'}
                  </>
                )}
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
