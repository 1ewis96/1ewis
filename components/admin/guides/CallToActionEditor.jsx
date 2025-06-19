import React from 'react';

const CallToActionEditor = ({ callToAction, updateCallToAction }) => {
  // Update CTA fields
  const handleCtaChange = (field, value) => {
    updateCallToAction({
      ...callToAction,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Edit Call-to-Action</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">CTA Text</label>
            <input
              type="text"
              value={callToAction.text}
              onChange={(e) => handleCtaChange('text', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Enter call-to-action text..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
            <input
              type="text"
              value={callToAction.buttonText}
              onChange={(e) => handleCtaChange('buttonText', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Enter button text..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
            <input
              type="text"
              value={callToAction.url}
              onChange={(e) => handleCtaChange('url', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Enter URL..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={callToAction.backgroundColor}
                  onChange={(e) => handleCtaChange('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded border-0 p-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={callToAction.backgroundColor}
                  onChange={(e) => handleCtaChange('backgroundColor', e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={callToAction.textColor}
                  onChange={(e) => handleCtaChange('textColor', e.target.value)}
                  className="w-10 h-10 rounded border-0 p-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={callToAction.textColor}
                  onChange={(e) => handleCtaChange('textColor', e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
            <div 
              className="p-4 rounded-lg flex flex-col items-center justify-center text-center"
              style={{ 
                backgroundColor: callToAction.backgroundColor || '#3d14b4',
                color: callToAction.textColor || '#ffffff'
              }}
            >
              <p className="text-lg font-medium mb-3" style={{ color: callToAction.textColor || '#ffffff' }}>
                {callToAction.text || 'Start Your Crypto Journey Today'}
              </p>
              <button
                type="button"
                className="px-5 py-2 rounded-lg font-medium border-2"
                style={{ 
                  borderColor: callToAction.textColor || '#ffffff',
                  color: callToAction.textColor || '#ffffff'
                }}
              >
                {callToAction.buttonText || 'Create Free Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionEditor;
