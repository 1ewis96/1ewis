import React, { useState } from 'react';
import { Upload, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import AutoplayVideoEditor from './AutoplayVideoEditor';

const BasicInfoForm = ({ 
  guideData, 
  handleBasicInfoChange, 
  handleFileSelect, 
  handleTagsChange,
  uploading, 
  uploadProgress,
  interactiveElements,
  setInteractiveElements
}) => {
  const [showAutoplayEditor, setShowAutoplayEditor] = useState(false);
  
  // Handler for updating autoplay video data
  const handleAutoplayVideoUpdate = (videoData) => {
    setInteractiveElements(prev => ({
      ...prev,
      videoPlayer: {
        ...videoData,
        id: videoData.id || `video-${Date.now()}`
      }
    }));
  };
  return (
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
          className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white min-h-[100px]"
          placeholder="Enter a short description of the guide..."
          value={guideData.description}
          onChange={(e) => handleBasicInfoChange('description', e.target.value)}
        />
      </div>
      
      {/* Featured Image and Fallback Image side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
          <div className="space-y-2">
            {guideData.image && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2 bg-gray-800">
                <img 
                  src={guideData.image} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => handleFileSelect(e, 'image');
                  input.click();
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
                disabled={uploading}
              >
                {uploading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <input 
                type="text" 
                className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                placeholder="Or enter image URL..."
                value={guideData.image}
                onChange={(e) => handleBasicInfoChange('image', e.target.value)}
              />
            </div>
            {uploading && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Fallback Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fallback Image</label>
          <div className="space-y-2">
            {guideData.fallbackImage && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2 bg-gray-800">
                <img 
                  src={guideData.fallbackImage} 
                  alt="Fallback" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => handleFileSelect(e, 'fallbackImage');
                  input.click();
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
                disabled={uploading}
              >
                {uploading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <input 
                type="text" 
                className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                placeholder="Or enter image URL..."
                value={guideData.fallbackImage}
                onChange={(e) => handleBasicInfoChange('fallbackImage', e.target.value)}
              />
            </div>
            {uploading && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Slug (auto-generated from title)</label>
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
      
      {/* Author Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
      
      {/* Author Avatar */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Author Avatar</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            {guideData.author.avatar && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={guideData.author.avatar} 
                  alt="Author avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => handleFileSelect(e, 'author.avatar');
                    input.click();
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
                  disabled={uploading}
                >
                  {uploading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  {uploading ? 'Uploading...' : 'Upload Avatar'}
                </button>
                <input 
                  type="text" 
                  className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Or enter avatar URL..."
                  value={guideData.author.avatar}
                  onChange={(e) => handleBasicInfoChange('author.avatar', e.target.value)}
                />
              </div>
              {uploading && (
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Publication Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Publication Date</label>
          <input 
            type="date" 
            className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            value={guideData.publishedDate.split('T')[0]}
            onChange={(e) => handleBasicInfoChange('publishedDate', new Date(e.target.value).toISOString())}
          />
        </div>
        
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
            onChange={(e) => handleBasicInfoChange('readTime', parseInt(e.target.value))}
          />
        </div>
      </div>
      
      {/* Autoplay Video Editor Section */}
      <div className="mt-8 border-t border-gray-800 pt-6">
        <button
          type="button"
          onClick={() => setShowAutoplayEditor(!showAutoplayEditor)}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <span className="text-lg font-medium">Guide Autoplay Video</span>
          {showAutoplayEditor ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {showAutoplayEditor && (
          <div className="mt-4">
            <AutoplayVideoEditor 
              videoData={interactiveElements.videoPlayer || {}} 
              onUpdate={handleAutoplayVideoUpdate}
              handleFileSelect={handleFileSelect}
              uploading={uploading}
              uploadProgress={uploadProgress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoForm;
