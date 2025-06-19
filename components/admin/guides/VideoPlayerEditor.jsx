import React from 'react';
import ImageUploader from './ImageUploader';

const VideoPlayerEditor = ({ videoPlayer, updateVideoPlayer, handleFileSelect, uploading, uploadProgress }) => {
  // Update video player fields
  const handleVideoPlayerChange = (field, value) => {
    updateVideoPlayer({
      ...videoPlayer,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Edit Video Player</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video Title</label>
            <input
              type="text"
              value={videoPlayer.title}
              onChange={(e) => handleVideoPlayerChange('title', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Enter video title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video ID (YouTube)</label>
            <input
              type="text"
              value={videoPlayer.videoId}
              onChange={(e) => handleVideoPlayerChange('videoId', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="e.g. dQw4w9WgXcQ"
            />
            <p className="text-xs text-gray-400 mt-1">Enter the YouTube video ID (e.g. dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={videoPlayer.description}
              onChange={(e) => handleVideoPlayerChange('description', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-20"
              placeholder="Enter video description..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
            <ImageUploader
              imageUrl={videoPlayer.thumbnailUrl}
              onFileSelect={(e) => handleFileSelect(e, `videoPlayer.thumbnailUrl`)}
              onUrlChange={(_, value) => handleVideoPlayerChange('thumbnailUrl', value)}
              fieldName={`videoPlayer.thumbnailUrl`}
              uploading={uploading}
              uploadProgress={uploadProgress}
              height="h-32"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Autoplay</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={videoPlayer.autoplay}
                  onChange={(e) => handleVideoPlayerChange('autoplay', e.target.checked)}
                  className="w-4 h-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 bg-gray-800 rounded"
                />
                <span className="ml-2 text-gray-300">Enable autoplay</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Show Delay (ms)</label>
              <input
                type="number"
                value={videoPlayer.showDelay}
                onChange={(e) => handleVideoPlayerChange('showDelay', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                placeholder="Delay in milliseconds"
                min="0"
                step="1000"
              />
              <p className="text-xs text-gray-400 mt-1">Delay before showing the video (in milliseconds)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerEditor;
