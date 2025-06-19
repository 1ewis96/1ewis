import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Image, Code, Upload, Loader, Eye, EyeOff } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InteractiveElementEditor from './InteractiveElementEditor';

const SectionEditor = ({ 
  sections, 
  setSections, 
  handleFileSelect, 
  addInteractiveElementToSection,
  uploading,
  uploadProgress,
  handleDragEnd,
  interactiveElements,
  setInteractiveElements
}) => {
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Add a new section
  const addSection = () => {
    const newSectionId = `section-${Date.now()}`;
    const newSection = {
      id: newSectionId,
      title: 'New Section',
      content: '',
      image: '',
      interactiveElements: []
    };
    
    setSections([...sections, newSection]);
    
    // Auto-expand the new section
    setExpandedSections(prev => ({
      ...prev,
      [newSectionId]: true
    }));
  };

  // Remove a section
  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  // Update section field
  const updateSection = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    setSections(updatedSections);
  };
  
  // Toggle content visibility for a section
  const toggleContentVisibility = (index) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      hideContent: !updatedSections[index].hideContent
    };
    setSections(updatedSections);
  };

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border border-gray-700 rounded-lg bg-gray-900/50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between p-4 bg-gray-800/50">
                        <div className="flex items-center">
                          <div 
                            {...provided.dragHandleProps}
                            className="cursor-grab p-2 mr-2 hover:bg-gray-700 rounded"
                          >
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <h3 className="text-white font-medium">
                            Section {index + 1}: {section.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                          >
                            {expandedSections[section.id] ? (
                              <ChevronUp className="w-5 h-5 text-gray-300" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="p-1.5 hover:bg-red-900/50 text-red-400 hover:text-red-300 rounded-md transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {expandedSections[section.id] && (
                        <div className="p-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                              value={section.title}
                              onChange={(e) => updateSection(index, 'title', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-gray-300">Section Content</label>
                              <button
                                type="button"
                                onClick={() => toggleContentVisibility(index)}
                                className="flex items-center px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                                title={section.hideContent ? "Show content area" : "Hide content area"}
                              >
                                {section.hideContent ? (
                                  <>
                                    <Eye className="w-3 h-3 mr-1" />
                                    <span>Show Content</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3 mr-1" />
                                    <span>Hide Content</span>
                                  </>
                                )}
                              </button>
                            </div>
                            {!section.hideContent && (
                              <textarea 
                                className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white min-h-[150px]"
                                value={section.content}
                                onChange={(e) => updateSection(index, 'content', e.target.value)}
                              />
                            )}
                            {section.hideContent && (
                              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 text-sm">
                                Content area is hidden. This section will display only interactive elements.
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Section Image</label>
                            <div className="space-y-2">
                              {section.image && (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2 bg-gray-800">
                                  <img 
                                    src={section.image} 
                                    alt={`Section ${index + 1}`} 
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
                                    input.onchange = (e) => handleFileSelect(e, `section-${index}`);
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
                                  value={section.image}
                                  onChange={(e) => updateSection(index, 'image', e.target.value)}
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
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Interactive Elements</label>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => addInteractiveElementToSection(index, 'quiz')}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg flex items-center transition-colors"
                              >
                                <Plus className="w-4 h-4 mr-1.5" />
                                Add Quiz
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => addInteractiveElementToSection(index, 'video')}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg flex items-center transition-colors"
                              >
                                <Plus className="w-4 h-4 mr-1.5" />
                                Add Video Player
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => addInteractiveElementToSection(index, 'cta')}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg flex items-center transition-colors"
                              >
                                <Plus className="w-4 h-4 mr-1.5" />
                                Add Call-to-Action
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => addInteractiveElementToSection(index, 'codeBlock')}
                                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg flex items-center transition-colors"
                              >
                                <Plus className="w-4 h-4 mr-1.5" />
                                Add Code Block
                              </button>
                            </div>
                            
                            {/* Display added interactive elements */}
                            {section.interactiveElements && section.interactiveElements.length > 0 && (
                              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="text-sm font-medium text-cyan-400 mb-2">Added Interactive Elements</h4>
                                <div className="flex flex-wrap gap-2">
                                  {section.interactiveElements.map((element, idx) => (
                                    <div key={idx} className="px-3 py-2 bg-gray-700 text-white text-sm rounded-lg flex items-center">
                                      {element === 'quiz' && 'Quiz'}
                                      {element === 'video' && 'Video Player'}
                                      {element === 'cta' && 'Call-to-Action'}
                                      {element === 'codeBlock' && 'Code Block'}
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Interactive Element Editor */}
                                <div className="mt-4">
                                  <InteractiveElementEditor
                                    interactiveElements={interactiveElements}
                                    setInteractiveElements={setInteractiveElements}
                                    sections={sections}
                                    handleFileSelect={handleFileSelect}
                                    uploading={uploading}
                                    uploadProgress={uploadProgress}
                                    sectionId={section.id}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <button
        type="button"
        onClick={addSection}
        className="w-full py-3 border-2 border-dashed border-gray-700 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Section
      </button>
    </div>
  );
};

export default SectionEditor;
