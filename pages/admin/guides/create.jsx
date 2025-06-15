import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminNavigation from '../../../components/AdminNavigation';
import { motion } from 'framer-motion';
import { FileText, Image, List, Plus, Save, ArrowLeft, Eye, Trash2, GripVertical, Code, X, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import withAdminAuth from '../../../components/withAdminAuth';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CreateGuidePage() {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Guide basic information state
  const [guideData, setGuideData] = useState({
    id: '',
    slug: '',
    title: '',
    description: '',
    image: 'https://s3.1ewis.com/placeholder.webp',
    fallbackImage: 'https://s3.1ewis.com/placeholder.webp',
    publishedDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    author: {
      name: '',
      avatar: 'https://s3.1ewis.com/placeholder.webp',
      bio: ''
    },
    category: '',
    tags: [],
    readTime: 5,
    sections: [],
    relatedGuides: [],
    interactiveElements: {}
  });
  
  // State for sections
  const [sections, setSections] = useState([]);
  
  // State for interactive elements - now with sectionId tracking
  const [interactiveElements, setInteractiveElements] = useState({
    coinWidget: {
      tokenId: '',
      currency: 'usd',
      showRefreshButton: true,
      position: 'top',
      sectionId: null
    },
    quiz: {
      id: '',
      title: '',
      description: '',
      questions: [],
      sectionId: null
    },
    priceTracker: {
      tokens: [],
      refreshInterval: 60000,
      defaultTimeframe: '24h',
      sectionId: null
    },
    videoPlayer: {
      videoId: '',
      title: '',
      description: '',
      thumbnailUrl: 'https://s3.1ewis.com/placeholder.webp',
      autoplay: false,
      showDelay: 5000,
      sectionId: null
    },
    callToAction: {
      text: '',
      buttonText: '',
      url: '',
      backgroundColor: '#3d14b4',
      sectionId: null,
      textColor: '#ffffff'
    }
  });
  
  // Available section types
  const sectionTypes = [
    { id: 'text', name: 'Text Section', icon: <FileText className="w-4 h-4" /> },
    { id: 'interactive', name: 'Interactive Section', icon: <Code className="w-4 h-4" /> }
  ];
  
  // Available content types
  const contentTypes = [
    { id: 'paragraph', name: 'Paragraph', icon: <FileText className="w-3 h-3" /> },
    { id: 'list', name: 'List', icon: <List className="w-3 h-3" /> },
    { id: 'html', name: 'HTML Content', icon: <Code className="w-3 h-3" /> }
  ];
  
  // Available interactive element types
  const interactiveElementTypes = [
    { id: 'coinWidget', name: 'Coin Price Widget' },
    { id: 'quiz', name: 'Knowledge Quiz' },
    { id: 'videoPlayer', name: 'Video Player' },
    { id: 'callToAction', name: 'Call to Action Button' },
    { id: 'priceTracker', name: 'Token Price Tracker' }
  ];
  
  // This is a placeholder comment to maintain line numbers
  // The generateGuideJson function has been moved and improved below
  // The old implementation has been completely removed to avoid duplication
  
  // Handle basic info changes
  const handleBasicInfoChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setGuideData({
        ...guideData,
        [parent]: {
          ...guideData[parent],
          [child]: value
        }
      });
    } else {
      setGuideData({
        ...guideData,
        [field]: value
      });
    }
  };
  
  // Handle tag input
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setGuideData({
      ...guideData,
      tags: tagsArray
    });
  };
  
  // Generate a unique ID for sections
  const generateUniqueId = (title) => {
    const baseSlug = title.toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    return `${baseSlug}-${Date.now().toString().slice(-6)}`;
  };
  
  // Generate the guide JSON for preview and saving
  const generateGuideJson = () => {
    // Process sections to include interactive elements
    const processedSections = sections.map(section => {
      const sectionCopy = {...section};
      
      // Check if this section has any associated interactive elements
      if (interactiveElements.videoPlayer && interactiveElements.videoPlayer.sectionId === section.id) {
        sectionCopy.videoPlayer = {
          videoId: interactiveElements.videoPlayer.videoId,
          platform: interactiveElements.videoPlayer.platform,
          title: interactiveElements.videoPlayer.title
        };
      }
      
      if (interactiveElements.priceTracker && interactiveElements.priceTracker.sectionId === section.id) {
        sectionCopy.hasTokenPriceTracker = true;
        sectionCopy.trackedTokens = interactiveElements.priceTracker.tokens;
        sectionCopy.refreshInterval = interactiveElements.priceTracker.refreshInterval;
        sectionCopy.defaultTimeframe = interactiveElements.priceTracker.defaultTimeframe;
      }
      
      if (interactiveElements.coinWidget && interactiveElements.coinWidget.sectionId === section.id) {
        sectionCopy.coinWidget = {
          tokenId: interactiveElements.coinWidget.tokenId,
          currency: interactiveElements.coinWidget.currency,
          showRefreshButton: interactiveElements.coinWidget.showRefreshButton,
          position: interactiveElements.coinWidget.position
        };
      }
      
      if (interactiveElements.quiz && interactiveElements.quiz.sectionId === section.id) {
        sectionCopy.quiz = interactiveElements.quiz;
      }
      
      if (interactiveElements.callToAction && interactiveElements.callToAction.sectionId === section.id) {
        sectionCopy.callToAction = interactiveElements.callToAction;
      }
      
      return sectionCopy;
    });
    
    // Construct the final guide object
    return {
      ...guideData,
      sections: processedSections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };
  
  // Save guide to the API
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  
  const saveGuide = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const guideData = generateGuideJson();
      
      const response = await fetch('https://api.1ewis.com/admin/create/guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(guideData)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json();
      alert('Guide saved successfully!');
      console.log('Guide saved:', result);
      
      // Optionally redirect to the guides list or the new guide
      // window.location.href = '/admin/guides';
    } catch (error) {
      console.error('Error saving guide:', error);
      setSaveError(error.message);
      alert(`Error saving guide: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add a new section
  const addSection = (sectionType = 'text') => {
    let newSection = {
      id: generateUniqueId('new-section'),
      title: 'New Section',
      image: 'https://s3.1ewis.com/placeholder.webp'
    };
    
    if (sectionType === 'text') {
      newSection.content = [
        {
          type: 'paragraph',
          text: 'Enter your content here...'
        }
      ];
    } else if (sectionType === 'interactive') {
      // For interactive sections, we'll add a placeholder and set the interactive element type
      newSection.content = [
        {
          type: 'paragraph',
          text: 'This section contains interactive elements. Add content to explain the interactive feature.'
        }
      ];
      // Don't set any interactive element by default
      // The user will choose which interactive element to add
    }
    
    setSections([...sections, newSection]);
  };
  
  // This comment is a placeholder to maintain line numbers
  // The handleDragEnd function is already defined below
  
  // Add a specific type of interactive element to a section
  const addInteractiveElementToSection = (sectionIndex, elementType) => {
    const updatedSections = [...sections];
    const updatedInteractiveElements = {...interactiveElements};
    const sectionId = updatedSections[sectionIndex].id;
    
    if (elementType === 'tokenTracker') {
      // Add token price tracker with empty tokens array
      updatedInteractiveElements.priceTracker = {
        tokens: [],
        refreshInterval: 60000,
        defaultTimeframe: '24h',
        sectionId: sectionId
      };
    } else if (elementType === 'coinWidget') {
      // Add coin widget
      updatedInteractiveElements.coinWidget = {
        tokenId: 'bitcoin',
        currency: 'usd',
        showRefreshButton: true,
        position: 'top',
        sectionId: sectionId
      };
    } else if (elementType === 'quiz') {
      // We'll handle quiz in the interactive elements state
      updatedInteractiveElements.quiz = {
        id: generateUniqueId('quiz'),
        title: 'Test Your Knowledge',
        description: 'Take this quiz to see how much you\'ve learned',
        questions: [
          {
            id: generateUniqueId('question'),
            text: 'Sample question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0,
            explanation: 'Explanation for the correct answer.'
          }
        ],
        sectionId: sectionId
      };
    } else if (elementType === 'video') {
      // Add video player
      updatedInteractiveElements.videoPlayer = {
        videoId: 'jxeeKKfjb5o',
        title: 'What is Bitcoin? Crypto Explained',
        description: 'A simple explanation of Bitcoin and how it works',
        thumbnailUrl: 'https://s3.1ewis.com/placeholder.webp',
        autoplay: false,
        showDelay: 5000,
        sectionId: sectionId
      };
    } else if (elementType === 'cta') {
      // Add call to action
      updatedInteractiveElements.callToAction = {
        text: 'Start Your Crypto Journey Today',
        buttonText: 'Create Free Account',
        url: '/signup',
        backgroundColor: '#3d14b4',
        textColor: '#ffffff',
        sectionId: sectionId
      };
    }
    
    setInteractiveElements(updatedInteractiveElements);
    setSections(updatedSections);
  };
  
  // Update a section
  const updateSection = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    setSections(updatedSections);
  };
  
  // Update section content
  const updateSectionContent = (sectionIndex, contentIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].content[contentIndex][field] = value;
    setSections(updatedSections);
  };
  
  // Add content to a section
  const addContentToSection = (sectionIndex, contentType) => {
    const updatedSections = [...sections];
    let newContent;
    
    switch(contentType) {
      case 'paragraph':
        newContent = { type: 'paragraph', text: 'New paragraph text...' };
        break;
      case 'list':
        newContent = { type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] };
        break;
      case 'html':
        newContent = { type: 'html', html: '<p>Enter your HTML content here...</p>' };
        break;
      default:
        newContent = { type: 'paragraph', text: 'New content...' };
    }
    
    if (!Array.isArray(updatedSections[sectionIndex].content)) {
      updatedSections[sectionIndex].content = [];
    }
    
    updatedSections[sectionIndex].content.push(newContent);
    setSections(updatedSections);
  };
  
  // Remove a section
  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };
  
  // Handle drag end for reordering sections
  const handleDragEnd = (result) => {
    // If there's no destination or the item was dropped in the same place, do nothing
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
    
    // Create a new array from the current sections
    const items = Array.from(sections);
    
    // Remove the dragged item from its original position
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    // Insert the dragged item at its new position
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the state with the new order
    setSections(items);
  };
  
  return (
    <>
      <Head>
        <title>Create Guide | 1ewis.com Admin</title>
        <meta name="description" content="Create a new guide for 1ewis.com" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <AdminNavigation />
      
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Create New Guide
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Create an interactive guide with sections, content blocks, and metadata
              </motion.p>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </motion.button>
              
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Guide
              </motion.button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-800">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'basic' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Basic Information
                {activeTab === 'basic' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'sections' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Sections & Content
                {activeTab === 'sections' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === 'preview' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Preview
                {activeTab === 'preview' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <motion.div 
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Guide Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="Enter guide title..."
                    value={guideData.title}
                    onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Short Description</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-24"
                    placeholder="Enter a short description of the guide..."
                    value={guideData.description}
                    onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                        placeholder="https://example.com/image.jpg"
                        value={guideData.image}
                        onChange={(e) => handleBasicInfoChange('image', e.target.value)}
                      />
                      <button className="bg-gray-800 px-4 py-2 rounded-r-lg border-y border-r border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors">
                        <Image className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="guide-url-slug"
                      value={guideData.slug}
                      onChange={(e) => {
                        handleBasicInfoChange('slug', e.target.value);
                        handleBasicInfoChange('id', e.target.value);
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                    <select 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white appearance-none"
                      value={guideData.author.name}
                      onChange={(e) => handleBasicInfoChange('author.name', e.target.value)}
                    >
                      <option value="">Select Author</option>
                      <option value="Lewis">Lewis</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="e.g. Cryptocurrency Basics"
                      value={guideData.category}
                      onChange={(e) => handleBasicInfoChange('category', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Publication Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      value={guideData.publishedDate.split('T')[0]}
                      onChange={(e) => handleBasicInfoChange('publishedDate', new Date(e.target.value).toISOString())}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="Enter tags separated by commas..."
                      value={guideData.tags.join(', ')}
                      onChange={handleTagsChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Read Time (minutes)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      min="1"
                      max="60"
                      value={guideData.readTime}
                      onChange={(e) => handleBasicInfoChange('readTime', parseInt(e.target.value) || 5)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author Bio</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-20"
                    placeholder="Enter author bio..."
                    value={guideData.author.bio}
                    onChange={(e) => handleBasicInfoChange('author.bio', e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}
            
            {activeTab === 'sections' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Guide Sections</h3>
                  <div className="flex space-x-2">
                    <div className="relative group">
                      <button 
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Section
                      </button>
                      <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                        {sectionTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => addSection(type.id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                          >
                            <span className="mr-2">{type.icon}</span>
                            {type.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {sections.length === 0 ? (
                  <div className="p-8 border border-dashed border-gray-700 rounded-lg text-center text-gray-400">
                    No sections added yet. Click "Add Section" to create your first guide section.
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections-droppable">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4"
                        >
                          {sections.map((section, index) => (
                            <Draggable key={section.id} draggableId={`section-${section.id}`} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    ...(snapshot.isDragging ? { boxShadow: '0 5px 20px rgba(0,0,0,0.3)' } : {})
                                  }}
                                  className={`border border-gray-700 rounded-lg overflow-hidden ${snapshot.isDragging ? 'bg-gray-700/70' : 'bg-gray-800/50'}`}
                                >
                                  <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
                                    <div className="flex items-center">
                                      <div 
                                        {...provided.dragHandleProps}
                                        className="cursor-move p-1 mr-2 rounded hover:bg-gray-700 transition-colors"
                                      >
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <input
                                        type="text"
                                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-white font-medium"
                                        value={section.title}
                                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                                        placeholder="Section Title"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <button 
                                        onClick={() => removeSection(index)}
                                        className="p-1 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div className="p-4 space-y-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Section ID</label>
                                        <input
                                          type="text"
                                          className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                          value={section.id}
                                          onChange={(e) => updateSection(index, 'id', e.target.value)}
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Section Image</label>
                                        <input
                                          type="text"
                                          className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                          value={section.image}
                                          onChange={(e) => updateSection(index, 'image', e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-300">Content</label>
                                        <div className="flex space-x-1">
                                          <button 
                                            onClick={() => addContentToSection(index, 'paragraph')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <FileText className="w-3 h-3 mr-1" />
                                            Add Paragraph
                                          </button>
                                          <button 
                                            onClick={() => addContentToSection(index, 'list')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <List className="w-3 h-3 mr-1" />
                                            Add List
                                          </button>
                                        </div>
                                      </div>
                                      
                                      {Array.isArray(section.content) ? (
                                        <div className="space-y-3">
                                          {section.content.map((content, contentIndex) => (
                                            <div key={contentIndex} className="border border-gray-700/50 rounded p-3 bg-black/20">
                                              <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-medium text-gray-400 uppercase">{content.type}</span>
                                                <button 
                                                  onClick={() => {
                                                    const updatedSections = [...sections];
                                                    updatedSections[index].content.splice(contentIndex, 1);
                                                    setSections(updatedSections);
                                                  }}
                                                  className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </button>
                                              </div>
                                              
                                              {content.type === 'paragraph' && (
                                                <textarea
                                                  className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm h-24"
                                                  value={content.text}
                                                  onChange={(e) => updateSectionContent(index, contentIndex, 'text', e.target.value)}
                                                  placeholder="Enter paragraph text. You can use [[keyword]](https://example.com) for links."
                                                ></textarea>
                                              )}
                                              
                                              {content.type === 'list' && (
                                                <div className="space-y-2">
                                                  {content.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="flex items-center">
                                                      <input
                                                        type="text"
                                                        className="flex-1 px-3 py-1.5 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                                        value={item}
                                                        onChange={(e) => {
                                                          const updatedSections = [...sections];
                                                          updatedSections[index].content[contentIndex].items[itemIndex] = e.target.value;
                                                          setSections(updatedSections);
                                                        }}
                                                      />
                                                      <button 
                                                        onClick={() => {
                                                          const updatedSections = [...sections];
                                                          updatedSections[index].content[contentIndex].items.splice(itemIndex, 1);
                                                          setSections(updatedSections);
                                                        }}
                                                        className="p-1 ml-2 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                                      >
                                                        <Trash2 className="w-3 h-3" />
                                                      </button>
                                                    </div>
                                                  ))}
                                                  <button 
                                                    onClick={() => {
                                                      const updatedSections = [...sections];
                                                      updatedSections[index].content[contentIndex].items.push('New item');
                                                      setSections(updatedSections);
                                                    }}
                                                    className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center w-full justify-center"
                                                  >
                                                    <Plus className="w-3 h-3 mr-1" />
                                                    Add Item
                                                  </button>
                                                </div>
                                              )}
                                              
                                              {content.type === 'html' && (
                                                <textarea
                                                  className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm h-40 font-mono"
                                                  value={content.html}
                                                  onChange={(e) => updateSectionContent(index, contentIndex, 'html', e.target.value)}
                                                  placeholder="<p>Enter HTML content here. You can use <strong>tags</strong> for formatting.</p>"
                                                ></textarea>
                                              )}
                                            </div>
                                          ))}
                                          
                                          <div className="flex justify-between mt-2">
                                            <div className="flex space-x-1">
                                              {contentTypes.map((type) => (
                                                <button 
                                                  key={type.id}
                                                  onClick={() => addContentToSection(index, type.id)}
                                                  className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                  {type.icon}
                                                  <span className="ml-1">Add {type.name}</span>
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="border border-gray-700/50 rounded p-3 bg-black/20">
                                          <textarea
                                            className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm h-24"
                                            value={section.content}
                                            onChange={(e) => updateSection(index, 'content', e.target.value)}
                                          ></textarea>
                                        </div>
                                      )}
                                      
                                      {/* Interactive elements section - now handled by the interactiveElements state */}
                                      
                                      {/* Add interactive element buttons */}
                                      {(
                                        <div className="mt-4 flex flex-wrap gap-2">
                                          <button 
                                            onClick={() => addInteractiveElementToSection(index, 'coinWidget')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-cyan-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Coin Widget
                                          </button>
                                          <button 
                                            onClick={() => addInteractiveElementToSection(index, 'tokenTracker')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-blue-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Token Price Tracker
                                          </button>
                                          <button 
                                            onClick={() => addInteractiveElementToSection(index, 'quiz')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-purple-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Quiz
                                          </button>
                                          <button 
                                            onClick={() => addInteractiveElementToSection(index, 'video')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-amber-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Video Player
                                          </button>
                                          <button 
                                            onClick={() => addInteractiveElementToSection(index, 'cta')}
                                            className="px-2 py-1 bg-gray-800 text-xs text-green-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                          >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add Call to Action
                                          </button>
                                        </div>
                                      )}
                                      
                                      {/* Video Player Editor */}
                                      {interactiveElements.videoPlayer && interactiveElements.videoPlayer.videoId && interactiveElements.videoPlayer.sectionId === section.id && (
                                        <div className="mt-6 border border-amber-700/30 rounded-lg p-4 bg-black/30">
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-amber-400">Video Player</h3>
                                            <button 
                                              onClick={() => {
                                                const updatedInteractiveElements = {...interactiveElements};
                                                updatedInteractiveElements.videoPlayer = {
                                                  videoId: '',
                                                  title: '',
                                                  description: '',
                                                  thumbnailUrl: 'https://s3.1ewis.com/placeholder.webp',
                                                  autoplay: false,
                                                  showDelay: 5000
                                                };
                                                setInteractiveElements(updatedInteractiveElements);
                                              }}
                                              className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Video ID (YouTube)</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.videoPlayer.videoId}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.videoPlayer.videoId = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="e.g. jxeeKKfjb5o"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Video Title</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.videoPlayer.title}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.videoPlayer.title = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Video Title"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                              <textarea
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent text-white text-sm h-16"
                                                value={interactiveElements.videoPlayer.description}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.videoPlayer.description = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Video Description"
                                              ></textarea>
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Thumbnail URL</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.videoPlayer.thumbnailUrl}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.videoPlayer.thumbnailUrl = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="https://s3.1ewis.com/placeholder.webp"
                                              />
                                            </div>
                                            
                                            <div className="flex space-x-4">
                                              <div className="flex items-center">
                                                <input
                                                  type="checkbox"
                                                  id="autoplay"
                                                  className="mr-2 text-amber-500 focus:ring-amber-500"
                                                  checked={interactiveElements.videoPlayer.autoplay}
                                                  onChange={(e) => {
                                                    const updatedInteractiveElements = {...interactiveElements};
                                                    updatedInteractiveElements.videoPlayer.autoplay = e.target.checked;
                                                    setInteractiveElements(updatedInteractiveElements);
                                                  }}
                                                />
                                                <label htmlFor="autoplay" className="text-xs font-medium text-gray-400">Autoplay</label>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Show Delay (ms)</label>
                                                <input
                                                  type="number"
                                                  className="w-24 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent text-white text-sm"
                                                  value={interactiveElements.videoPlayer.showDelay}
                                                  onChange={(e) => {
                                                    const updatedInteractiveElements = {...interactiveElements};
                                                    updatedInteractiveElements.videoPlayer.showDelay = parseInt(e.target.value);
                                                    setInteractiveElements(updatedInteractiveElements);
                                                  }}
                                                  min="0"
                                                  step="1000"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Coin Widget Editor */}
                                      {interactiveElements.coinWidget && interactiveElements.coinWidget.tokenId && interactiveElements.coinWidget.sectionId === section.id && (
                                        <div className="mt-6 border border-cyan-700/30 rounded-lg p-4 bg-black/30">
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-cyan-400">Coin Price Widget</h3>
                                            <button 
                                              onClick={() => {
                                                const updatedInteractiveElements = {...interactiveElements};
                                                updatedInteractiveElements.coinWidget = {
                                                  tokenId: '',
                                                  currency: 'usd',
                                                  showRefreshButton: true,
                                                  position: 'top'
                                                };
                                                setInteractiveElements(updatedInteractiveElements);
                                              }}
                                              className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Token ID</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.coinWidget.tokenId}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.coinWidget.tokenId = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="e.g. bitcoin"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Currency</label>
                                              <select
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.coinWidget.currency}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.coinWidget.currency = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                              >
                                                <option value="usd">USD</option>
                                                <option value="eur">EUR</option>
                                                <option value="gbp">GBP</option>
                                                <option value="jpy">JPY</option>
                                              </select>
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Position</label>
                                              <select
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.coinWidget.position}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.coinWidget.position = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                              >
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                              </select>
                                            </div>
                                            
                                            <div className="flex items-center">
                                              <input
                                                type="checkbox"
                                                id="showRefreshButton"
                                                className="mr-2 text-cyan-500 focus:ring-cyan-500"
                                                checked={interactiveElements.coinWidget.showRefreshButton}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.coinWidget.showRefreshButton = e.target.checked;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                              />
                                              <label htmlFor="showRefreshButton" className="text-xs font-medium text-gray-400">Show Refresh Button</label>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Price Tracker Editor */}
                                      {interactiveElements.priceTracker && interactiveElements.priceTracker.tokens && interactiveElements.priceTracker.sectionId === section.id && (
                                        <div className="mt-6 border border-blue-700/30 rounded-lg p-4 bg-black/30">
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-blue-400">Token Price Tracker</h3>
                                            <button 
                                              onClick={() => {
                                                const updatedInteractiveElements = {...interactiveElements};
                                                updatedInteractiveElements.priceTracker = {
                                                  tokens: [],
                                                  refreshInterval: 60000,
                                                  defaultTimeframe: '24h'
                                                };
                                                setInteractiveElements(updatedInteractiveElements);
                                              }}
                                              className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-2">Tracked Tokens</label>
                                              <div className="flex flex-wrap gap-2 mb-2">
                                                {interactiveElements.priceTracker.tokens.map((token, tokenIndex) => (
                                                  <div 
                                                    key={tokenIndex}
                                                    className="flex items-center bg-gray-800 px-2 py-1 rounded-lg"
                                                  >
                                                    <span className="text-xs text-blue-300 mr-2">{token}</span>
                                                    <button
                                                      onClick={() => {
                                                        const updatedInteractiveElements = {...interactiveElements};
                                                        updatedInteractiveElements.priceTracker.tokens = 
                                                          updatedInteractiveElements.priceTracker.tokens.filter((_, i) => i !== tokenIndex);
                                                        setInteractiveElements(updatedInteractiveElements);
                                                      }}
                                                      className="text-gray-400 hover:text-red-400"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                ))}
                                              </div>
                                              
                                              <div className="flex items-center">
                                                <input
                                                  type="text"
                                                  id="newToken"
                                                  placeholder="Add token (e.g. bitcoin)"
                                                  className="flex-1 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-white text-sm"
                                                  onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.priceTracker.tokens = 
                                                        [...updatedInteractiveElements.priceTracker.tokens, e.target.value.trim().toLowerCase()];
                                                      setInteractiveElements(updatedInteractiveElements);
                                                      e.target.value = '';
                                                    }
                                                  }}
                                                />
                                                <button
                                                  onClick={() => {
                                                    const input = document.getElementById('newToken');
                                                    if (input.value.trim()) {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.priceTracker.tokens = 
                                                        [...updatedInteractiveElements.priceTracker.tokens, input.value.trim().toLowerCase()];
                                                      setInteractiveElements(updatedInteractiveElements);
                                                      input.value = '';
                                                    }
                                                  }}
                                                  className="ml-2 px-3 py-2 bg-blue-900/60 text-blue-300 rounded-lg hover:bg-blue-800/60 transition-colors text-sm"
                                                >
                                                  Add
                                                </button>
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Refresh Interval (ms)</label>
                                              <input
                                                type="number"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.priceTracker.refreshInterval}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.priceTracker.refreshInterval = parseInt(e.target.value);
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                min="5000"
                                                step="1000"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Default Timeframe</label>
                                              <select
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.priceTracker.defaultTimeframe}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.priceTracker.defaultTimeframe = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                              >
                                                <option value="1h">1 Hour</option>
                                                <option value="24h">24 Hours</option>
                                                <option value="7d">7 Days</option>
                                                <option value="30d">30 Days</option>
                                                <option value="1y">1 Year</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Call to Action Editor */}
                                      {interactiveElements.callToAction && interactiveElements.callToAction.text && interactiveElements.callToAction.sectionId === section.id && (
                                        <div className="mt-6 border border-green-700/30 rounded-lg p-4 bg-black/30">
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-green-400">Call to Action</h3>
                                            <button 
                                              onClick={() => {
                                                const updatedInteractiveElements = {...interactiveElements};
                                                updatedInteractiveElements.callToAction = {
                                                  text: '',
                                                  buttonText: '',
                                                  url: '',
                                                  backgroundColor: '#3d14b4',
                                                  textColor: '#ffffff'
                                                };
                                                setInteractiveElements(updatedInteractiveElements);
                                              }}
                                              className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">CTA Text</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.callToAction.text}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.callToAction.text = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Start Your Crypto Journey Today"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Button Text</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.callToAction.buttonText}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.callToAction.buttonText = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Create Free Account"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">URL</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.callToAction.url}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.callToAction.url = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="/signup"
                                              />
                                            </div>
                                            
                                            <div className="flex space-x-4">
                                              <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Background Color</label>
                                                <div className="flex items-center space-x-2">
                                                  <input
                                                    type="color"
                                                    className="w-8 h-8 rounded border border-gray-700 bg-transparent"
                                                    value={interactiveElements.callToAction.backgroundColor}
                                                    onChange={(e) => {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.callToAction.backgroundColor = e.target.value;
                                                      setInteractiveElements(updatedInteractiveElements);
                                                    }}
                                                  />
                                                  <input
                                                    type="text"
                                                    className="w-24 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-white text-sm"
                                                    value={interactiveElements.callToAction.backgroundColor}
                                                    onChange={(e) => {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.callToAction.backgroundColor = e.target.value;
                                                      setInteractiveElements(updatedInteractiveElements);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                              
                                              <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">Text Color</label>
                                                <div className="flex items-center space-x-2">
                                                  <input
                                                    type="color"
                                                    className="w-8 h-8 rounded border border-gray-700 bg-transparent"
                                                    value={interactiveElements.callToAction.textColor}
                                                    onChange={(e) => {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.callToAction.textColor = e.target.value;
                                                      setInteractiveElements(updatedInteractiveElements);
                                                    }}
                                                  />
                                                  <input
                                                    type="text"
                                                    className="w-24 px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-white text-sm"
                                                    value={interactiveElements.callToAction.textColor}
                                                    onChange={(e) => {
                                                      const updatedInteractiveElements = {...interactiveElements};
                                                      updatedInteractiveElements.callToAction.textColor = e.target.value;
                                                      setInteractiveElements(updatedInteractiveElements);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: interactiveElements.callToAction.backgroundColor }}>
                                              <div className="text-center">
                                                <p className="mb-2 text-sm font-medium" style={{ color: interactiveElements.callToAction.textColor }}>
                                                  {interactiveElements.callToAction.text || 'Start Your Crypto Journey Today'}
                                                </p>
                                                <button 
                                                  className="px-4 py-2 rounded-lg text-sm font-medium" 
                                                  style={{ 
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                    color: interactiveElements.callToAction.textColor
                                                  }}
                                                >
                                                  {interactiveElements.callToAction.buttonText || 'Create Free Account'}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Quiz Editor */}
                                      {interactiveElements.quiz && interactiveElements.quiz.id && interactiveElements.quiz.sectionId === section.id && (
                                        <div className="mt-6 border border-purple-700/30 rounded-lg p-4 bg-black/30">
                                          <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-purple-400">Knowledge Quiz</h3>
                                            <button 
                                              onClick={() => {
                                                const updatedInteractiveElements = {...interactiveElements};
                                                updatedInteractiveElements.quiz = {
                                                  id: '',
                                                  title: '',
                                                  description: '',
                                                  questions: []
                                                };
                                                setInteractiveElements(updatedInteractiveElements);
                                              }}
                                              className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Quiz Title</label>
                                              <input
                                                type="text"
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white text-sm"
                                                value={interactiveElements.quiz.title}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.quiz.title = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Quiz Title"
                                              />
                                            </div>
                                            
                                            <div>
                                              <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                              <textarea
                                                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white text-sm h-16"
                                                value={interactiveElements.quiz.description}
                                                onChange={(e) => {
                                                  const updatedInteractiveElements = {...interactiveElements};
                                                  updatedInteractiveElements.quiz.description = e.target.value;
                                                  setInteractiveElements(updatedInteractiveElements);
                                                }}
                                                placeholder="Quiz Description"
                                              ></textarea>
                                            </div>
                                            
                                            <div>
                                              <div className="flex justify-between items-center mb-2">
                                                <label className="text-xs font-medium text-gray-400">Questions</label>
                                                <button 
                                                  onClick={() => {
                                                    const updatedInteractiveElements = {...interactiveElements};
                                                    updatedInteractiveElements.quiz.questions.push({
                                                      id: generateUniqueId('question'),
                                                      text: 'New question?',
                                                      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                                                      correctAnswer: 0,
                                                      explanation: 'Explanation for the correct answer.'
                                                    });
                                                    setInteractiveElements(updatedInteractiveElements);
                                                  }}
                                                  className="px-2 py-1 bg-gray-800 text-xs text-purple-300 rounded hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                  <Plus className="w-3 h-3 mr-1" />
                                                  Add Question
                                                </button>
                                              </div>
                                              
                                              {interactiveElements.quiz.questions.length === 0 ? (
                                                <div className="p-4 border border-dashed border-gray-700 rounded-lg text-center text-gray-500 text-sm">
                                                  No questions added yet. Click "Add Question" to create your first question.
                                                </div>
                                              ) : (
                                                <div className="space-y-4">
                                                  {interactiveElements.quiz.questions.map((question, qIndex) => (
                                                    <div key={question.id} className="border border-gray-700 rounded-lg p-3 bg-black/20">
                                                      <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-medium text-purple-400">Question {qIndex + 1}</span>
                                                        <button 
                                                          onClick={() => {
                                                            const updatedInteractiveElements = {...interactiveElements};
                                                            updatedInteractiveElements.quiz.questions.splice(qIndex, 1);
                                                            setInteractiveElements(updatedInteractiveElements);
                                                          }}
                                                          className="p-1 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                                        >
                                                          <Trash2 className="w-3 h-3" />
                                                        </button>
                                                      </div>
                                                      
                                                      <div className="space-y-3">
                                                        <div>
                                                          <input
                                                            type="text"
                                                            className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white text-sm"
                                                            value={question.text}
                                                            onChange={(e) => {
                                                              const updatedInteractiveElements = {...interactiveElements};
                                                              updatedInteractiveElements.quiz.questions[qIndex].text = e.target.value;
                                                              setInteractiveElements(updatedInteractiveElements);
                                                            }}
                                                            placeholder="Question text"
                                                          />
                                                        </div>
                                                        
                                                        <div className="space-y-2">
                                                          <label className="block text-xs font-medium text-gray-400">Options</label>
                                                          {question.options.map((option, oIndex) => (
                                                            <div key={oIndex} className="flex items-center">
                                                              <input
                                                                type="radio"
                                                                className="mr-2 text-purple-500 focus:ring-purple-500"
                                                                checked={question.correctAnswer === oIndex}
                                                                onChange={() => {
                                                                  const updatedInteractiveElements = {...interactiveElements};
                                                                  updatedInteractiveElements.quiz.questions[qIndex].correctAnswer = oIndex;
                                                                  setInteractiveElements(updatedInteractiveElements);
                                                                }}
                                                              />
                                                              <input
                                                                type="text"
                                                                className="flex-1 px-3 py-1.5 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white text-sm"
                                                                value={option}
                                                                onChange={(e) => {
                                                                  const updatedInteractiveElements = {...interactiveElements};
                                                                  updatedInteractiveElements.quiz.questions[qIndex].options[oIndex] = e.target.value;
                                                                  setInteractiveElements(updatedInteractiveElements);
                                                                }}
                                                                placeholder={`Option ${oIndex + 1}`}
                                                              />
                                                              <button 
                                                                onClick={() => {
                                                                  const updatedInteractiveElements = {...interactiveElements};
                                                                  updatedInteractiveElements.quiz.questions[qIndex].options.splice(oIndex, 1);
                                                                  if (question.correctAnswer === oIndex) {
                                                                    updatedInteractiveElements.quiz.questions[qIndex].correctAnswer = 0;
                                                                  } else if (question.correctAnswer > oIndex) {
                                                                    updatedInteractiveElements.quiz.questions[qIndex].correctAnswer--;
                                                                  }
                                                                  setInteractiveElements(updatedInteractiveElements);
                                                                }}
                                                                className="p-1 ml-2 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                                                                disabled={question.options.length <= 2}
                                                              >
                                                                <Trash2 className="w-3 h-3" />
                                                              </button>
                                                            </div>
                                                          ))}
                                                          
                                                          {question.options.length < 6 && (
                                                            <button 
                                                              onClick={() => {
                                                                const updatedInteractiveElements = {...interactiveElements};
                                                                updatedInteractiveElements.quiz.questions[qIndex].options.push(`Option ${question.options.length + 1}`);
                                                                setInteractiveElements(updatedInteractiveElements);
                                                              }}
                                                              className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded hover:bg-gray-700 transition-colors flex items-center w-full justify-center"
                                                            >
                                                              <Plus className="w-3 h-3 mr-1" />
                                                              Add Option
                                                            </button>
                                                          )}
                                                        </div>
                                                        
                                                        <div>
                                                          <label className="block text-xs font-medium text-gray-400 mb-1">Explanation</label>
                                                          <textarea
                                                            className="w-full px-3 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-white text-sm h-16"
                                                            value={question.explanation}
                                                            onChange={(e) => {
                                                              const updatedInteractiveElements = {...interactiveElements};
                                                              updatedInteractiveElements.quiz.questions[qIndex].explanation = e.target.value;
                                                              setInteractiveElements(updatedInteractiveElements);
                                                            }}
                                                            placeholder="Explanation for the correct answer"
                                                          ></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
            )}
            
            {activeTab === 'preview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">JSON Preview</h3>
                  <button 
                    onClick={() => {
                      const jsonString = JSON.stringify(generateGuideJson(), null, 2);
                      navigator.clipboard.writeText(jsonString);
                      alert('JSON copied to clipboard!');
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Copy JSON
                  </button>
                </div>
                
                <div className="border border-gray-700 rounded-lg bg-black/40 p-4 overflow-auto max-h-[500px]">
                  <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(generateGuideJson(), null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </motion.div>

          <div className="mt-8 flex justify-end space-x-4">
            <button 
              className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button 
              onClick={saveGuide}
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'Saving...' : 'Save Guide'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAdminAuth(CreateGuidePage);
