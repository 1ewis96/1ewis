import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import withAdminAuth from '../../../components/withAdminAuth';
import AdminNavigation from '../../../components/AdminNavigation';
import { useRouter } from 'next/router';

// Import our new components
import BasicInfoForm from '../../../components/admin/guides/BasicInfoForm';
import SectionEditor from '../../../components/admin/guides/SectionEditor';
import GuidePreview from '../../../components/admin/guides/GuidePreview';
import { uploadImage, generateSlug, generateGuideJson } from '../../../components/admin/guides/utils';

function CreateGuidePage() {
  const router = useRouter();
  const { edit } = router.query;
  
  const [activeTab, setActiveTab] = useState('basic');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [tagsInput, setTagsInput] = useState('');
  
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
  const [sections, setSections] = useState([
    {
      id: `section-${Date.now()}`,
      title: 'Introduction',
      content: '',
      image: '',
      interactiveElements: []
    }
  ]);
  
  // State for interactive elements - now with sectionId tracking
  const [interactiveElements, setInteractiveElements] = useState({
    quiz: {
      id: '',
      title: '',
      description: '',
      questions: [],
      sectionId: null
    },
    videoPlayer: {
      id: '',
      title: '',
      videoUrl: '',
      thumbnailUrl: '',
      sectionId: null
    },
    callToAction: {
      id: '',
      title: '',
      buttonText: '',
      buttonUrl: '',
      sectionId: null
    },
    codeBlock: {
      id: '',
      language: 'javascript',
      code: '',
      sectionId: null
    }
  });
  
  // Fetch guide data if edit parameter is present
  useEffect(() => {
    if (edit && router.isReady) {
      fetchGuideData(edit);
    }
  }, [edit, router.isReady]);
  
  // Fetch guide data from API
  const fetchGuideData = async (slug) => {
    setIsLoading(true);
    setLoadError(null);
    setIsEditing(true);
    
    try {
      const response = await fetch(`https://api.1ewis.com/guides/fetch/${slug}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch guide: ${response.status}`);
      }
      
      const guideData = await response.json();
      
      // Populate form with fetched data
      populateFormWithGuideData(guideData);
    } catch (error) {
      console.error('Error fetching guide data:', error);
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Populate form with fetched guide data
  const populateFormWithGuideData = (guide) => {
    // Set basic guide data
    setGuideData({
      id: guide.id || guide.slug,
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      image: guide.image || 'https://s3.1ewis.com/placeholder.webp',
      fallbackImage: guide.fallbackImage || guide.image || 'https://s3.1ewis.com/placeholder.webp',
      publishedDate: guide.publishedDate,
      updatedDate: new Date().toISOString(),
      author: {
        name: guide.author?.name || '',
        avatar: guide.author?.avatar || 'https://s3.1ewis.com/placeholder.webp',
        bio: guide.author?.bio || ''
      },
      category: guide.category || '',
      tags: guide.tags || [],
      readTime: guide.readTime || 5,
      relatedGuides: guide.relatedGuides || []
    });
    
    // Set tags input field
    if (guide.tags && guide.tags.length > 0) {
      setTagsInput(guide.tags.join(', '));
    }
    
    // Set sections
    if (guide.sections && guide.sections.length > 0) {
      setSections(guide.sections.map(section => ({
        ...section,
        interactiveElements: section.interactiveElements?.map(el => el.type) || []
      })));
    }
    
    // Set interactive elements
    const newInteractiveElements = {
      quiz: {
        id: '',
        title: '',
        description: '',
        questions: [],
        sectionId: null
      },
      videoPlayer: {
        id: '',
        title: '',
        videoUrl: '',
        thumbnailUrl: '',
        sectionId: null
      },
      callToAction: {
        id: '',
        title: '',
        buttonText: '',
        buttonUrl: '',
        sectionId: null
      },
      codeBlock: {
        id: '',
        language: 'javascript',
        code: '',
        sectionId: null
      }
    };
    
    // Process global interactive elements
    if (guide.interactiveElements) {
      if (guide.interactiveElements.videoPlayer) {
        newInteractiveElements.videoPlayer = {
          ...guide.interactiveElements.videoPlayer,
          sectionId: null
        };
      }
    }
    
    // Process section-specific interactive elements
    guide.sections?.forEach(section => {
      section.interactiveElements?.forEach(element => {
        if (element.type && newInteractiveElements[element.type]) {
          // If this is the first element of this type, set it directly
          if (!newInteractiveElements[element.type].id) {
            newInteractiveElements[element.type] = {
              ...element,
              sectionId: section.id
            };
            delete newInteractiveElements[element.type].type;
          }
          // Otherwise, we'd need to handle multiple elements of the same type
          // This would require restructuring the state to support arrays of elements
        }
      });
    });
    
    setInteractiveElements(newInteractiveElements);
  };

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
      // Auto-generate slug when title changes
      if (field === 'title') {
        const slug = generateSlug(value);
        setGuideData({
          ...guideData,
          [field]: value,
          slug: slug,
          id: slug
        });
      } else {
        setGuideData({
          ...guideData,
          [field]: value
        });
      }
    }
  };

  // Handle tags input
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    setTagsInput(tagsString);
    
    // Only update the actual tags array when saving or when needed for validation
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    setGuideData({
      ...guideData,
      tags: tagsArray
    });
  };

  // Handle file selection
  const handleFileSelect = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Get API key from local storage or environment
      const apiKey = localStorage.getItem('adminApiKey') || process.env.NEXT_PUBLIC_ADMIN_API_KEY;
      
      const imageUrl = await uploadImage(file, apiKey, setUploading, setUploadProgress);
      
      if (imageUrl) {
        if (targetField.includes('.')) {
          const [parent, child] = targetField.split('.');
          setGuideData({
            ...guideData,
            [parent]: {
              ...guideData[parent],
              [child]: imageUrl
            }
          });
        } else if (targetField.startsWith('section-')) {
          const sectionIndex = parseInt(targetField.split('-')[1]);
          const updatedSections = [...sections];
          updatedSections[sectionIndex] = {
            ...updatedSections[sectionIndex],
            image: imageUrl
          };
          setSections(updatedSections);
        } else {
          setGuideData({
            ...guideData,
            [targetField]: imageUrl
          });
        }
      }
    } catch (error) {
      alert(`Failed to upload image: ${error.message}`);
    }
  };

  // Add interactive element to section
  const addInteractiveElementToSection = (sectionIndex, elementType) => {
    const updatedSections = [...sections];
    const updatedInteractiveElements = {...interactiveElements};
    const sectionId = updatedSections[sectionIndex].id || `section-${sectionIndex}-${Date.now()}`;
    
    // Ensure section has an ID
    if (!updatedSections[sectionIndex].id) {
      updatedSections[sectionIndex].id = sectionId;
    }
    
    if (elementType === 'quiz') {
      updatedInteractiveElements.quiz = {
        ...updatedInteractiveElements.quiz,
        id: `quiz-${Date.now()}`,
        title: 'Sample Quiz',
        description: 'Test your knowledge',
        questions: [
          {
            id: `question-${Date.now()}`,
            text: 'Sample question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0,
            explanation: 'Explanation for the correct answer.'
          }
        ],
        sectionId: sectionId
      };
    } else if (elementType === 'video') {
      updatedInteractiveElements.videoPlayer = {
        ...updatedInteractiveElements.videoPlayer,
        id: `video-${Date.now()}`,
        videoId: 'jxeeKKfjb5o',
        title: 'What is Bitcoin? Crypto Explained',
        description: 'A simple explanation of Bitcoin and how it works',
        thumbnailUrl: 'https://s3.1ewis.com/placeholder.webp',
        autoplay: false,
        showDelay: 5000,
        sectionId: sectionId
      };
    } else if (elementType === 'cta') {
      updatedInteractiveElements.callToAction = {
        ...updatedInteractiveElements.callToAction,
        id: `cta-${Date.now()}`,
        text: 'Start Your Crypto Journey Today',
        buttonText: 'Create Free Account',
        url: '/signup',
        backgroundColor: '#3d14b4',
        textColor: '#ffffff',
        sectionId: sectionId
      };
    } else if (elementType === 'codeBlock') {
      updatedInteractiveElements.codeBlock = {
        ...updatedInteractiveElements.codeBlock,
        id: `code-${Date.now()}`,
        language: 'javascript',
        code: '// Sample code block\nconst hello = "world";\nconsole.log(hello);',
        sectionId: sectionId
      };
    }
    
    // Update the section to track which interactive elements it has
    if (!updatedSections[sectionIndex].interactiveElements) {
      updatedSections[sectionIndex].interactiveElements = [];
    }
    updatedSections[sectionIndex].interactiveElements.push(elementType);
    
    setSections(updatedSections);
    setInteractiveElements(updatedInteractiveElements);
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSections(items);
  };

  // Save guide to API
  const saveGuide = async () => {
    setIsSaving(true);
    
    try {
      const guideJson = createFinalGuideJson();
      
      // Get API key from local storage or environment
      const apiKey = localStorage.getItem('adminApiKey') || process.env.NEXT_PUBLIC_ADMIN_API_KEY;
      
      if (!apiKey) {
        throw new Error('Admin API key not found');
      }
      
      if (isEditing) {
        // Update existing guide
        const response = await fetch('https://api.1ewis.com/admin/update/guide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({ guide: guideJson })
        });
        
        if (!response.ok) {
          throw new Error(`Update failed: ${response.status}`);
        }
        
        const data = await response.json();
        alert('Guide updated successfully!');
      } else {
        // Create new guide
        const response = await fetch('https://api.1ewis.com/admin/create/guide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({ guide: guideJson })
        });
        
        if (!response.ok) {
          throw new Error(`Save failed: ${response.status}`);
        }
        
        const data = await response.json();
        alert('Guide saved successfully!');
      }
      
      // Optionally redirect to the guide list or edit page
      // window.location.href = '/admin/guides';
    } catch (error) {
      console.error('Save error:', error);
      alert(`Failed to save guide: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Create the final guide JSON for saving
  const createFinalGuideJson = () => {
    return generateGuideJson(guideData, sections, interactiveElements);
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
                {isEditing ? 'Edit Guide' : 'Create New Guide'}
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
                onClick={saveGuide}
                disabled={isSaving}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Guide'}
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
          
          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'basic' && (
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
                
                <BasicInfoForm 
                  guideData={guideData}
                  handleBasicInfoChange={handleBasicInfoChange}
                  handleFileSelect={handleFileSelect}
                  handleTagsChange={handleTagsChange}
                  uploading={uploading}
                  uploadProgress={uploadProgress}
                  interactiveElements={interactiveElements}
                  setInteractiveElements={setInteractiveElements}
                  tagsInput={tagsInput}
                  isEditing={isEditing}
                />
              </div>
            )}
            
            {activeTab === 'sections' && (
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Sections & Content</h2>
                
                <SectionEditor 
                  sections={sections}
                  setSections={setSections}
                  handleFileSelect={handleFileSelect}
                  addInteractiveElementToSection={addInteractiveElementToSection}
                  uploading={uploading}
                  uploadProgress={uploadProgress}
                  handleDragEnd={handleDragEnd}
                  interactiveElements={interactiveElements}
                  setInteractiveElements={setInteractiveElements}
                />
              </div>
            )}
            
            {activeTab === 'preview' && (
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Preview</h2>
                
                <GuidePreview 
                  guideData={{...guideData, sections: sections}}
                  generateGuideJson={() => createFinalGuideJson()}
                />
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
