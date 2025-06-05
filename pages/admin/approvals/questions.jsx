import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThumbsUp, X, Check, Tag, AlertTriangle, Trash2 } from 'lucide-react';
import AdminNavigation from '../../../components/AdminNavigation';
import withAdminAuth from '../../../components/withAdminAuth';
import { getStoredApiKey } from '../../../utils/authUtils';

// API endpoints
const RANDOM_QUESTION_API = 'https://api.1ewis.com/admin/list/random/question';
const UPDATE_QUESTION_API = 'https://api.1ewis.com/admin/update/question';
const DELETE_QUESTION_API = 'https://api.1ewis.com/admin/delete/question';

const QuestionsApproval = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Fetch a random question that needs approval
  const fetchRandomQuestion = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        setError('API key not found. Please log in again.');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(RANDOM_QUESTION_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const questionData = await response.json();
      setCurrentQuestion(questionData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(`Failed to load question: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  // Initialize by fetching first question
  useEffect(() => {
    fetchRandomQuestion();
  }, []);
  
  // Handle approving a question
  const handleApprove = async () => {
    if (!currentQuestion) return;
    
    setIsLoading(true);
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Prepare the updated question data
      const updatedQuestion = {
        ...currentQuestion,
        approved: 1,
        status: 'approved',
        question: isEditing ? editedQuestion : currentQuestion.question
      };
      
      // Send the update to the API
      const response = await fetch(UPDATE_QUESTION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedQuestion)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      console.log('Question approved:', currentQuestion.PK);
      // Fetch next question after approval
      fetchRandomQuestion();
      // Reset editing state
      setIsEditing(false);
      setEditedQuestion('');
    } catch (err) {
      console.error('Error approving question:', err);
      setError(`Failed to approve question: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  // Handle deleting a question
  const handleDelete = async () => {
    if (!currentQuestion) return;
    
    try {
      setIsDeleting(true);
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Extract the PK and SK from the current question
      const { PK, SK } = currentQuestion;
      
      if (!PK || !SK) {
        throw new Error('Question is missing required identifiers (PK or SK)');
      }
      
      const response = await fetch(DELETE_QUESTION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ PK, SK })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      console.log('Question deleted successfully');
      
      // Fetch another question after successful deletion
      fetchRandomQuestion();
    } catch (err) {
      console.error('Error deleting question:', err);
      setError(`Failed to delete question: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Toggle editing mode for question text
  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditedQuestion(currentQuestion?.question || '');
    }
  };
  
  // Handle AI-generated SEO tags
  const handleGenerateSeoTags = async () => {
    if (!currentQuestion) return;
    
    setIsGeneratingSeo(true);
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Call the AI tag generation API
      const response = await fetch('https://api.1ewis.com/admin/ai/generate/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ question: currentQuestion.question })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Get the AI-generated tags
      const data = await response.json();
      
      // Update the question with new tags
      const updatedQuestion = {
        ...currentQuestion,
        tags: data.tags
      };
      
      // Update locally first for immediate UI feedback
      setCurrentQuestion(updatedQuestion);
      
      // Update the question in the database
      const updateResponse = await fetch(UPDATE_QUESTION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedQuestion)
      });
      
      if (!updateResponse.ok) {
        throw new Error(`Failed to update question with new tags: ${updateResponse.status}`);
      }
      
      console.log('AI SEO tags generated and applied successfully');
    } catch (err) {
      console.error('Error generating SEO tags:', err);
      setError(`Failed to generate SEO tags: ${err.message}`);
    } finally {
      setIsGeneratingSeo(false);
    }
  };
  
  // Handle removing a specific tag
  const handleRemoveTag = async (tagToRemove) => {
    if (!currentQuestion || !currentQuestion.tags) return;
    
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Create updated tags array without the removed tag
      const updatedTags = currentQuestion.tags.filter(tag => tag !== tagToRemove);
      
      // Create updated question object
      const updatedQuestion = {
        ...currentQuestion,
        tags: updatedTags
      };
      
      // Update locally first for immediate UI feedback
      setCurrentQuestion(updatedQuestion);
      
      // Send the update to the API
      const response = await fetch(UPDATE_QUESTION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedQuestion)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
        // If there's an error, we should revert the local change
        setCurrentQuestion(currentQuestion);
      }
      
      console.log(`Tag '${tagToRemove}' removed from question:`, currentQuestion.PK);
    } catch (err) {
      console.error('Error removing tag:', err);
      setError(`Failed to remove tag: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>Question Approvals | Admin | 1ewis.com</title>
      </Head>
      
      <AdminNavigation />
      
      <div className="py-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
            <ThumbsUp className="h-6 w-6 mr-2 text-blue-400" />
            Question Approvals
          </h1>
          
          {isLoading ? (
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-12 text-center shadow-2xl">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-10 bg-gray-700 rounded-lg w-1/3 mb-6"></div>
                <div className="h-5 bg-gray-700 rounded-lg w-2/3 mb-4"></div>
                <div className="h-5 bg-gray-700 rounded-lg w-1/2 mb-4"></div>
                <div className="h-5 bg-gray-700 rounded-lg w-3/5"></div>
                <div className="mt-8 flex space-x-4">
                  <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
                  <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 text-red-300 p-6 rounded-lg border border-red-800 shadow-lg shadow-red-900/10">
              <div className="flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
                <span className="text-lg">{error}</span>
              </div>
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => fetchRandomQuestion()}
                  className="px-4 py-2 bg-red-700/50 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-6">
              {/* Question Card */}
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/20">
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-400">ID: {currentQuestion.PK}</span>
                      <span className="ml-3 text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {currentQuestion.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(currentQuestion.timestamp).toLocaleDateString()} by {currentQuestion.username}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold text-white">Question Review</h2>
                    <button
                      onClick={toggleEditMode}
                      className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg hover:shadow-blue-600/30"
                    >
                      {isEditing ? 'Cancel Edit' : 'Edit Question'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="bg-gray-900/50 rounded-lg p-4 mb-5 shadow-inner">
                      <textarea
                        className="w-full bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 focus:outline-none text-lg"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                        rows={5}
                        placeholder="Edit question text here..."
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-lg p-5 mb-5 shadow-inner">
                      <p className="text-gray-200 text-lg leading-relaxed">{currentQuestion.question}</p>
                    </div>
                  )}
                  <div className="text-sm text-gray-400 mb-4 flex items-center">
                    <span className="font-medium mr-2 bg-gray-800 px-2 py-1 rounded-md">Source:</span> 
                    <span className="bg-gray-800/50 px-2 py-1 rounded-md">{currentQuestion.source}</span>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-400">Tags:</h3>
                      <button
                        onClick={handleGenerateSeoTags}
                        disabled={isGeneratingSeo}
                        className="flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white transition-all hover:from-purple-700 hover:to-blue-600 shadow-md hover:shadow-purple-500/20 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isGeneratingSeo ? (
                          <>
                            <div className="w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            AI Generate
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentQuestion.tags && currentQuestion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 group hover:bg-purple-800/50 transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-purple-300 hover:text-white transition-colors"
                            title="Remove tag"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-6 mt-8">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center px-6 py-3 rounded-lg bg-red-600/30 text-red-300 hover:bg-red-600/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-red-300 rounded-full animate-spin mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5 mr-2" />
                      Delete
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleApprove}
                  className="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Approve
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-10 text-center shadow-2xl">
              <div className="flex flex-col items-center">
                <ThumbsUp className="h-16 w-16 text-blue-500 mb-6" />
                <h3 className="text-xl font-medium text-gray-200 mb-3">No questions to review</h3>
                <p className="text-gray-400 mb-6">All pending questions have been processed.</p>
                <button 
                  onClick={() => fetchRandomQuestion()}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all transform hover:scale-105"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap the component with the authentication HOC
export default withAdminAuth(QuestionsApproval);
