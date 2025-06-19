import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const QuizEditor = ({ quiz, updateQuiz, sectionId }) => {
  // Update quiz title or description
  const handleQuizChange = (field, value) => {
    updateQuiz({
      ...quiz,
      [field]: value
    });
  };

  // Add a new question
  const addQuestion = () => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    
    updateQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion]
    });
  };

  // Update a question
  const updateQuestion = (questionIndex, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value
    };
    
    updateQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // Update an option
  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions
    };
    
    updateQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // Set correct answer
  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      correctAnswer: optionIndex
    };
    
    updateQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // Remove a question
  const removeQuestion = (questionIndex) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(questionIndex, 1);
    
    updateQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  return (
    <div className="space-y-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Edit Quiz</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title</label>
            <input
              type="text"
              value={quiz.title}
              onChange={(e) => handleQuizChange('title', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
              placeholder="Enter quiz title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={quiz.description}
              onChange={(e) => handleQuizChange('description', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-20"
              placeholder="Enter quiz description..."
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Questions</h4>
          <button
            type="button"
            onClick={addQuestion}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Question
          </button>
        </div>
        
        {quiz.questions.map((question, questionIndex) => (
          <div key={question.id} className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-medium text-cyan-400">Question {questionIndex + 1}</h5>
              <button
                type="button"
                onClick={() => removeQuestion(questionIndex)}
                className="p-1 hover:bg-gray-700 rounded-md text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question Text</label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  placeholder="Enter question text..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Options</label>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`correct-answer-${question.id}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => setCorrectAnswer(questionIndex, optionIndex)}
                        className="w-4 h-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 bg-gray-800"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                        placeholder={`Option ${optionIndex + 1}...`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">Select the radio button next to the correct answer</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Explanation</label>
                <textarea
                  value={question.explanation}
                  onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white h-20"
                  placeholder="Explain why the correct answer is right..."
                />
              </div>
            </div>
          </div>
        ))}
        
        {quiz.questions.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No questions added yet. Click "Add Question" to create your first question.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizEditor;
