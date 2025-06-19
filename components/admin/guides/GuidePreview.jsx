import React from 'react';

const GuidePreview = ({ guideData, generateGuideJson }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Guide Preview</h2>
        
        <div className="space-y-6">
          {/* Header Preview */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={guideData.image} 
              alt={guideData.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center mb-2">
                {guideData.author.avatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={guideData.author.avatar} 
                      alt={guideData.author.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-gray-300 text-sm">{guideData.author.name}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(guideData.publishedDate).toLocaleDateString()} • {guideData.readTime} min read
                  </p>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{guideData.title}</h1>
              <p className="text-gray-300 mt-2">{guideData.description}</p>
            </div>
          </div>
          
          {/* Sections Preview */}
          <div className="space-y-8">
            {guideData.sections.map((section, index) => (
              <div key={section.id} className="space-y-4">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                
                {section.image && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="text-gray-300 whitespace-pre-line">
                  {section.content}
                </div>
                
                {/* Interactive elements would render here */}
                {section.interactiveElements && section.interactiveElements.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                    <p className="text-cyan-400 text-sm font-medium">
                      Interactive elements: {section.interactiveElements.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* JSON Preview */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Guide JSON</h3>
        <div className="border border-gray-700 rounded-lg bg-black/40 p-4 overflow-auto max-h-[500px]">
          <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
            {JSON.stringify(generateGuideJson(), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default GuidePreview;
