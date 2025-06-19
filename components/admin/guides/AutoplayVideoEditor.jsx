import React, { useState } from 'react';
import { Upload, Loader } from 'lucide-react';

const AutoplayVideoEditor = ({ 
  videoData, 
  onUpdate, 
  handleFileSelect,
  uploading, 
  uploadProgress 
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field, value) => {
    onUpdate({
      ...videoData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Autoplay Video Player</h3>
      <p className="text-gray-400 mb-4">
        This video will appear in the corner of the guide page after a delay. It's separate from section videos.
      </p>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Video Title</label>
        <input 
          type="text" 
          className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="Enter video title..."
          value={videoData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">YouTube Video ID</label>
        <input 
          type="text" 
          className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="e.g. dQw4w9WgXcQ (from youtube.com/watch?v=dQw4w9WgXcQ)"
          value={videoData.videoId || ''}
          onChange={(e) => handleChange('videoId', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Video Description</label>
        <textarea 
          className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white min-h-[80px]"
          placeholder="Enter a short description..."
          value={videoData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Show Delay (milliseconds)</label>
        <input 
          type="number" 
          className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="e.g. 5000 (5 seconds)"
          value={videoData.showDelay || 5000}
          onChange={(e) => handleChange('showDelay', parseInt(e.target.value))}
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <label className="flex items-center text-sm font-medium text-gray-300">
          <input 
            type="checkbox" 
            className="w-4 h-4 mr-2 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-cyan-500"
            checked={videoData.autoplay || false}
            onChange={(e) => handleChange('autoplay', e.target.checked)}
          />
          Autoplay Video
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image</label>
        <div className="space-y-2">
          {videoData.thumbnailUrl && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2 bg-gray-800">
              <img 
                src={videoData.thumbnailUrl} 
                alt="Video thumbnail" 
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
                input.onchange = (e) => handleFileSelect(e, 'videoThumbnail');
                input.click();
              }}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center transition-colors"
              disabled={uploading}
            >
              {uploading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploading ? 'Uploading...' : 'Upload Thumbnail'}
            </button>
            <input 
              type="text" 
              className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Or enter thumbnail URL..."
              value={videoData.thumbnailUrl || ''}
              onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
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
      
      {videoData.videoId && (
        <div>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          
          {showPreview && (
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${videoData.videoId}`}
                  title={videoData.title || 'Video preview'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoplayVideoEditor;
