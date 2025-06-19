import React from 'react';
import { Upload, Loader } from 'lucide-react';

const ImageUploader = ({ 
  imageUrl, 
  onFileSelect, 
  onUrlChange, 
  fieldName, 
  uploading, 
  uploadProgress,
  height = "h-40"
}) => {
  return (
    <div className="space-y-2">
      {imageUrl && (
        <div className={`relative w-full ${height} rounded-lg overflow-hidden mb-2 bg-gray-800`}>
          <img 
            src={imageUrl} 
            alt="Uploaded image" 
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
            input.onchange = (e) => onFileSelect(e, fieldName);
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
          value={imageUrl}
          onChange={(e) => onUrlChange(fieldName, e.target.value)}
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
  );
};

export default ImageUploader;
