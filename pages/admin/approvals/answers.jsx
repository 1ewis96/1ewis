import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MessageCircle, AlertTriangle, Check, X, Trash2, User } from 'lucide-react';
import AdminNavigation from '../../../components/AdminNavigation';
import withAdminAuth from '../../../components/withAdminAuth';
import { getStoredApiKey } from '../../../utils/authUtils';

// API endpoints
const RANDOM_ANSWER_API = 'https://api.1ewis.com/admin/list/random/answer';
const RETRIEVE_QUESTION_API = 'https://api.1ewis.com/admin/retrieve/question';
const UPDATE_ANSWER_API = 'https://api.1ewis.com/admin/update/answer';
const DELETE_ANSWER_API = 'https://api.1ewis.com/admin/delete/answer';

const AnswersApproval = () => {
  const router = useRouter();
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Fetch a random answer that needs approval
  const fetchRandomAnswer = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      const response = await fetch(RANDOM_ANSWER_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const answerData = await response.json();
      setCurrentAnswer(answerData);
      
      // Fetch the associated question
      if (answerData && answerData.PK) {
        await fetchQuestionData(answerData.PK, apiKey);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching answer:', err);
      setError(`Failed to load answer: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  // Fetch the question data associated with the answer
  const fetchQuestionData = async (questionId, apiKey) => {
    try {
      const response = await fetch(RETRIEVE_QUESTION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ PK: questionId })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Question data response:', data);
      if (data && data.length > 0) {
        setQuestionData(data[0]);
      } else if (data) {
        // Handle case where data might not be an array
        setQuestionData(data);
      }
    } catch (err) {
      console.error('Error fetching question data:', err);
      setError(`Failed to load question data: ${err.message}`);
    }
  };
  
  // Initialize by fetching first answer
  useEffect(() => {
    fetchRandomAnswer();
  }, []);
  
  // Handle approving an answer
  const handleApprove = async () => {
    if (!currentAnswer) return;
    
    setIsLoading(true);
    try {
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Prepare the updated answer data
      const updatedAnswer = {
        ...currentAnswer,
        approved: 1,
        answer: isEditing ? editedAnswer : currentAnswer.answer
      };
      
      // Send the update to the API
      const response = await fetch(UPDATE_ANSWER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedAnswer)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      console.log('Answer approved:', currentAnswer.PK);
      // Fetch next answer after approval
      fetchRandomAnswer();
      // Reset editing state
      setIsEditing(false);
      setEditedAnswer('');
    } catch (err) {
      console.error('Error approving answer:', err);
      setError(`Failed to approve answer: ${err.message}`);
      setIsLoading(false);
    }
  };
  
  // Handle deleting an answer
  const handleDelete = async () => {
    if (!currentAnswer) return;
    
    try {
      setIsDeleting(true);
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Extract the PK and SK from the current answer
      const { PK, SK } = currentAnswer;
      
      if (!PK || !SK) {
        throw new Error('Answer is missing required identifiers (PK or SK)');
      }
      
      const response = await fetch(DELETE_ANSWER_API, {
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
      
      console.log('Answer deleted successfully');
      
      // Fetch another answer after successful deletion
      fetchRandomAnswer();
    } catch (err) {
      console.error('Error deleting answer:', err);
      setError(`Failed to delete answer: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Toggle editing mode for answer text
  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditedAnswer(currentAnswer?.answer || '');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>Answer Approvals | Admin | 1ewis.com</title>
      </Head>
      
      <AdminNavigation />
      
      <div className="py-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2 text-green-400" />
            Answer Approvals
  
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
                  onClick={() => fetchRandomAnswer()}
                  className="px-4 py-2 bg-red-700/50 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : currentAnswer ? (
            <div className="space-y-6">
              {/* Question Context */}
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden shadow-lg mb-6">
                <div className="px-6 py-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Question Context:</h3>
                  <p className="text-white font-medium text-lg">
                    {questionData ? (
                      questionData.question || 
                      (questionData.content && typeof questionData.content === 'string' ? questionData.content : null) ||
                      'No question text available'
                    ) : 'Loading question...'}
                  </p>
                </div>
              </div>
            
              {/* Answer Card */}
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden shadow-2xl transition-all hover:shadow-blue-900/20">
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-400">ID: {currentAnswer.PK}</span>
                      <span className="ml-3 text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {currentAnswer.source || 'User-generated'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(currentAnswer.timestamp).toLocaleDateString()} by {currentAnswer.username}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold text-white">Answer Review</h2>
                    <button
                      onClick={toggleEditMode}
                      className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg hover:shadow-blue-600/30"
                    >
                      {isEditing ? 'Cancel Edit' : 'Edit Answer'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <div className="bg-gray-900/50 rounded-lg p-4 mb-5 shadow-inner">
                      <textarea
                        className="w-full bg-gray-800 text-gray-300 p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500/20 focus:outline-none text-lg"
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                        rows={8}
                        placeholder="Edit answer text here..."
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-lg p-5 mb-5 shadow-inner">
                      <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">{currentAnswer.answer}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-6 mt-8">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-lg hover:shadow-xl hover:shadow-red-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
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
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-lg hover:shadow-xl hover:shadow-green-600/30 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Approve
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-10 text-center shadow-2xl">
              <h3 className="text-xl font-medium text-gray-300 mb-3">No answers to review</h3>
              <p className="text-gray-400">All pending answers have been processed.</p>
              <button 
                onClick={() => fetchRandomAnswer()}
                className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-blue-600/30"
              >
                Check Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap the component with the authentication HOC
export default withAdminAuth(AnswersApproval);
