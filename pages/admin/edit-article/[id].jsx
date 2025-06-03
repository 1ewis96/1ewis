import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AdminNavigation from '../../../components/AdminNavigation';
import { Save, X, AlertCircle, CheckCircle, Loader, Image as ImageIcon } from 'lucide-react';
import withAdminAuth from '../../../components/withAdminAuth';
import { getStoredApiKey } from '../../../utils/authUtils';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function EditArticle() {
  const router = useRouter();
  const { id } = router.query;
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [isSponsored, setIsSponsored] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorDisclosure, setSponsorDisclosure] = useState('This article was sponsored by the sponsor. Opinions are the author\'s own.');
  
  // Additional article fields
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [readTime, setReadTime] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [language, setLanguage] = useState('en');
  
  // Article identifiers for API
  const [PK, setPK] = useState('');
  const [SK, setSK] = useState('');
  const [publishType, setPublishType] = useState('publish');
  
  // Original article data for comparison
  const [originalArticle, setOriginalArticle] = useState(null);
  
  // Categories state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  // Fetch article data from API
  const fetchArticle = async (articleId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Log the received ID for debugging
      console.log('Received article ID:', articleId);
      
      // The articleId should already be in the format YYYY-MM-DD-XXXX
      // which is what the API expects
      const response = await fetch(`https://api.1ewis.com/news/article/${articleId}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const article = await response.json();
      
      console.log('Article data received:', article);
      
      // Set article data to form fields
      setTitle(article.title || '');
      setContent(article.content || '');
      setCategory(article.category || '');
      setTags(article.tags || []);
      
      // Handle author (can be string or object)
      if (article.author) {
        if (typeof article.author === 'object') {
          setAuthor(article.author.name || '');
        } else {
          setAuthor(article.author || '');
        }
      }
      
      // Handle source (can be string or object)
      if (article.source) {
        if (typeof article.source === 'object') {
          setSource(article.source.url || '');
        } else {
          setSource(article.source || '');
        }
      }
      
      // Handle sponsored content
      if (article.sponsored) {
        if (typeof article.sponsored === 'object') {
          setIsSponsored(article.sponsored.isSponsored || false);
          setSponsorName(article.sponsored.sponsorName || '');
          setSponsorDisclosure(article.sponsored.disclosure || '');
        } else {
          setIsSponsored(article.sponsored || false);
          setSponsorName('');
          setSponsorDisclosure('');
        }
      } else {
        setIsSponsored(false);
      }
      
      // Set additional fields
      setSummary(article.summary || '');
      setSlug(article.slug || '');
      
      // Handle readTime (can be string or number)
      if (article.readTime) {
        if (typeof article.readTime === 'string') {
          // Extract just the number if it's in format like "3 min"
          const readTimeMatch = article.readTime.match(/^(\d+)/);
          setReadTime(readTimeMatch ? parseInt(readTimeMatch[1]) : 5);
        } else {
          setReadTime(article.readTime || 5);
        }
      } else {
        setReadTime(5);
      }
      
      setIsFeatured(article.isFeatured || false);
      setLanguage(article.language || 'en');
      
      // Reconstruct PK and SK from the articleId
      // articleId format: YYYY-MM-DD-XXXX
      const parts = articleId.split('-');
      if (parts.length >= 4) {
        const dateStr = `${parts[0]}-${parts[1]}-${parts[2]}`;
        const idStr = parts[3];
        
        // Format: NEWS#YYYY-MM-DD#XXXX
        const pk = `NEWS#${dateStr}#${idStr}`;
        // Format: ARTICLE#XXXX
        const sk = `ARTICLE#${idStr}`;
        
        console.log('Reconstructed PK:', pk, 'SK:', sk);
        
        setPK(pk);
        setSK(sk);
      } else {
        // If we can't parse the ID correctly, use what we have from the API
        setPK(article.PK || '');
        setSK(article.SK || '');
      }
      
      setPublishType(article.publishType || 'draft');
      
      // Set thumbnail if available
      if (article.thumbnailUrl) {
        setThumbnailPreview(article.thumbnailUrl);
      }
      
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initialize component and fetch data
  useEffect(() => {
    if (id) {
      fetchArticle(id);
      fetchCategories();
    }
  }, [id]);

  // Add tag to the list
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Remove tag from the list
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setThumbnailFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnailPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert image to base64
  const getBase64FromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // The result contains the full Data URL (e.g., data:image/jpeg;base64,/9j/4AAQSkZJRg...)
        // We need to extract just the base64 part for the API
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !category || !PK || !SK) {
      setError('Please fill in all required fields. Missing required article data.');
      return;
    }
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Get API key
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Verify PK and SK are set
      if (!PK || !SK) {
        console.error('Missing PK or SK:', { PK, SK });
        throw new Error('Missing required article identifiers (PK or SK). Please try again.');
      }
      
      // Log the PK and SK for debugging
      console.log('Updating article with identifiers:', { PK, SK });
      
      // Prepare article data according to API requirements
      const articleData = {
        // Required fields
        PK,
        SK,
        publishType,
        originalPublishType: publishType, // Use current publish type as original
        
        // Optional fields to update
        title,
        content,
        summary,
        slug,
        category,
        tags,
        readTime,
        isFeatured,
        author,
        source,
        sponsored: isSponsored,
        sponsorName: isSponsored ? sponsorName : '',
        sponsorDisclosure: isSponsored ? sponsorDisclosure : '',
        language,
        updatedAt: new Date().toISOString()
      };
      
      // Add thumbnail if a new one was selected
      if (thumbnailFile) {
        try {
          const base64Image = await getBase64FromFile(thumbnailFile);
          // Extract the base64 data without the prefix (data:image/jpeg;base64,)
          const base64Data = base64Image.split(',')[1];
          
          // Make sure we have valid base64 data
          if (!base64Data) {
            throw new Error('Failed to extract base64 data from image');
          }
          
          // Log the first 20 characters of the base64 string for debugging
          console.log('Base64 data preview:', base64Data.substring(0, 20) + '...');
          
          // Add to article data
          articleData.thumbnailBase64 = base64Data;
        } catch (err) {
          console.error('Error processing image:', err);
          throw new Error('Failed to process image: ' + err.message);
        }
      }
      
      // Log the request payload for debugging
      console.log('Sending article update with data:', JSON.stringify(articleData, null, 2));
      
      // Send update request to API
      const response = await fetch(`https://api.1ewis.com/admin/update/article`, {
        method: 'POST', // Changed to POST as per API docs
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(articleData)
      });
      
      // Log the raw response for debugging
      console.log('API Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        
        // Try to parse as JSON if possible
        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.error('Failed to parse error response as JSON');
        }
        
        throw new Error(errorData.message || errorData.error || `Error: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      // Show success message
      setSuccess(`Article updated successfully. ID: ${responseData.id || id}`);
      
      // Redirect back to articles list after a short delay
      setTimeout(() => {
        router.push('/admin/edit-articles');
      }, 2000);
      
    } catch (err) {
      console.error('Error updating article:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing and go back
  const handleCancel = () => {
    router.push('/admin/edit-articles');
  };

  return (
    <>
      <Head>
        <title>Edit Article | Admin Dashboard | 1ewis.com</title>
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <AdminNavigation />
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Edit Article
            </h1>
          </motion.div>
          
          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          ) : error && !originalArticle ? (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
              <p className="flex items-center text-red-400">
                <AlertCircle className="mr-2" size={20} />
                {error}
              </p>
              <button 
                onClick={() => router.push('/admin/edit-articles')}
                className="mt-4 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-white rounded-lg transition-colors"
              >
                Back to Articles
              </button>
            </div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              {/* Success message */}
              {success && (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6">
                  <p className="flex items-center text-green-400">
                    <CheckCircle className="mr-2" size={20} />
                    {success}
                  </p>
                </div>
              )}
              
              {/* Error message */}
              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
                  <p className="flex items-center text-red-400">
                    <AlertCircle className="mr-2" size={20} />
                    {error}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                      Article Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Enter article title"
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                      Category *
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
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                      Tags
                    </label>
                    <div className="flex">
                      <input
                        id="tags"
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-grow px-4 py-3 bg-black/60 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-r-lg text-white transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-purple-900/50 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Thumbnail Image
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      {thumbnailPreview ? (
                        <div className="relative">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setThumbnailPreview('');
                              setThumbnailFile(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-black/40">
                          <ImageIcon className="w-10 h-10 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          id="thumbnail"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="thumbnail"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white cursor-pointer inline-block transition-colors"
                        >
                          {thumbnailPreview ? 'Change Image' : 'Upload Image'}
                        </label>
                        <p className="text-xs text-gray-400 mt-1">
                          Recommended: 1200×630px, max 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column */}
                <div className="space-y-6">
                  {/* Author */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                      Author
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Enter author name"
                    />
                  </div>
                  
                  {/* Source */}
                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-1">
                      Source URL
                    </label>
                    <input
                      id="source"
                      type="url"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="https://example.com/article"
                    />
                  </div>
                  
                  {/* Summary */}
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">
                      Summary
                    </label>
                    <textarea
                      id="summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Brief summary of the article"
                    ></textarea>
                  </div>
                  
                  {/* Slug */}
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
                      URL Slug
                    </label>
                    <input
                      id="slug"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="article-url-slug"
                    />
                  </div>
                  
                  {/* Read Time */}
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-300 mb-1">
                      Read Time (minutes)
                    </label>
                    <input
                      id="readTime"
                      type="number"
                      min="1"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="5"
                    />
                  </div>
                  
                  {/* Featured and Language */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <input
                        id="featured"
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-black/60 border-gray-700 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                        Featured Article
                      </label>
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
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
                  </div>
                  
                  {/* Publish Type */}
                  <div>
                    <label htmlFor="publishType" className="block text-sm font-medium text-gray-300 mb-1">
                      Publish Status
                    </label>
                    <select
                      id="publishType"
                      value={publishType}
                      onChange={(e) => setPublishType(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="publish">Published</option>
                      <option value="schedule">Scheduled</option>
                    </select>
                  </div>
                  
                  {/* Sponsored Content */}
                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        id="sponsored"
                        type="checkbox"
                        checked={isSponsored}
                        onChange={(e) => setIsSponsored(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-black/60 border-gray-700 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="sponsored" className="ml-2 text-sm font-medium text-gray-300">
                        This is sponsored content
                      </label>
                    </div>
                    
                    {isSponsored && (
                      <div className="space-y-4 mt-4 p-4 bg-purple-900/20 border border-purple-900/40 rounded-lg">
                        <div>
                          <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-300 mb-1">
                            Sponsor Name
                          </label>
                          <input
                            id="sponsorName"
                            type="text"
                            value={sponsorName}
                            onChange={(e) => setSponsorName(e.target.value)}
                            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                            placeholder="Enter sponsor name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="sponsorDisclosure" className="block text-sm font-medium text-gray-300 mb-1">
                            Disclosure Text
                          </label>
                          <textarea
                            id="sponsorDisclosure"
                            value={sponsorDisclosure}
                            onChange={(e) => setSponsorDisclosure(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                            placeholder="Enter disclosure text"
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Content - Full width */}
              <div className="mt-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                  Article Content *
                </label>
                <div className="quill-container">
                  {typeof window !== 'undefined' && (
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your article content here..."
                      className="bg-black/60 rounded-lg text-white quill-editor"
                    />
                  )}
                </div>
              </div>
              
              {/* Form actions */}
              <div className="mt-24 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {saving ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </main>
    </>
  );
}

export default withAdminAuth(EditArticle);
