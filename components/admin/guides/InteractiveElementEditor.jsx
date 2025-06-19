import React from 'react';
import QuizEditor from './QuizEditor';
import VideoPlayerEditor from './VideoPlayerEditor';
import CallToActionEditor from './CallToActionEditor';
import CodeBlockEditor from './CodeBlockEditor';

const InteractiveElementEditor = ({ 
  interactiveElements, 
  setInteractiveElements, 
  sections,
  handleFileSelect,
  uploading,
  uploadProgress,
  sectionId
}) => {
  // Get elements for this section
  const sectionElements = Object.entries(interactiveElements).filter(
    ([_, element]) => element.sectionId === sectionId
  );

  // Update quiz
  const updateQuiz = (updatedQuiz) => {
    setInteractiveElements({
      ...interactiveElements,
      quiz: updatedQuiz
    });
  };

  // Update video player
  const updateVideoPlayer = (updatedVideoPlayer) => {
    setInteractiveElements({
      ...interactiveElements,
      videoPlayer: updatedVideoPlayer
    });
  };

  // Update call to action
  const updateCallToAction = (updatedCallToAction) => {
    setInteractiveElements({
      ...interactiveElements,
      callToAction: updatedCallToAction
    });
  };

  // Update code block
  const updateCodeBlock = (updatedCodeBlock) => {
    setInteractiveElements({
      ...interactiveElements,
      codeBlock: updatedCodeBlock
    });
  };

  // Remove interactive element
  const removeInteractiveElement = (elementType) => {
    const updatedElements = { ...interactiveElements };
    
    // Reset the element's sectionId to null
    updatedElements[elementType] = {
      ...updatedElements[elementType],
      sectionId: null
    };
    
    // Update the sections to remove this element type
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
      const section = sections[sectionIndex];
      const updatedInteractiveElements = section.interactiveElements.filter(
        type => type !== elementType
      );
      
      // This would need to be handled by the parent component
      // We'll need to pass a callback to handle this
    }
    
    setInteractiveElements(updatedElements);
  };

  return (
    <div className="space-y-6">
      {sectionElements.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No interactive elements added to this section yet.
          Use the "Add Quiz", "Add Video Player", etc. buttons to add elements.
        </div>
      ) : (
        sectionElements.map(([type, element]) => (
          <div key={type} className="relative">
            <button
              onClick={() => removeInteractiveElement(type)}
              className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full z-10"
              title="Remove this element"
            >
              ×
            </button>
            
            {type === 'quiz' && (
              <QuizEditor 
                quiz={element} 
                updateQuiz={updateQuiz} 
                sectionId={sectionId} 
              />
            )}
            
            {type === 'videoPlayer' && (
              <VideoPlayerEditor 
                videoPlayer={element} 
                updateVideoPlayer={updateVideoPlayer} 
                handleFileSelect={handleFileSelect}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
            )}
            
            {type === 'callToAction' && (
              <CallToActionEditor 
                callToAction={element} 
                updateCallToAction={updateCallToAction} 
              />
            )}
            
            {type === 'codeBlock' && (
              <CodeBlockEditor 
                codeBlock={element} 
                updateCodeBlock={updateCodeBlock} 
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InteractiveElementEditor;
