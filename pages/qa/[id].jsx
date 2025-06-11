import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import ClientOnly from '../../components/ClientOnly';

// Import our new components
import LoadingState from '../../components/qa/LoadingState';
import ErrorState from '../../components/qa/ErrorState';
import EmptyState from '../../components/qa/EmptyState';
import BackButton from '../../components/qa/BackButton';
import QuestionDetailHead from '../../components/qa/QuestionDetailHead';
import QuestionStructuredData from '../../components/qa/QuestionStructuredData';
import QuestionCard from '../../components/qa/QuestionCard';
import AnswersList from '../../components/qa/AnswersList';
import BetaCallToAction from '../../components/qa/BetaCallToAction';
import BetaSignupModal from '../../components/qa/BetaSignupModal';

export default function QuestionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Track if the analytics call has been made for this page view
  const [analyticsLogged, setAnalyticsLogged] = useState(false);
  
  // Simple content function that returns the original content without enhancements
  // Keyword enhancement functionality removed - will be reimplemented later
  const enhanceContent = (content) => {
    return content || '';
  };
  
  // Reset analytics logged state when id changes
  useEffect(() => {
    setAnalyticsLogged(false);
  }, [id]);
  
  // Fetch question data from API and log view
  useEffect(() => {
    // Create a separate function for logging view to ensure it's only called once
    async function logQuestionView(questionId, questionSK) {
      // Check if this view has already been logged in this session or component state
      const viewLogKey = `qa_view_logged_${questionId}`;
      
      // Use both component state and session storage to prevent duplicate calls
      if (typeof window !== 'undefined' && !sessionStorage.getItem(viewLogKey) && !analyticsLogged) {
        try {
          // Set both flags immediately to prevent any possibility of duplicate calls
          sessionStorage.setItem(viewLogKey, 'true');
          setAnalyticsLogged(true);
          
          // Add a small delay to ensure React has time to update state
          // This helps prevent race conditions in development mode
          await new Promise(resolve => setTimeout(resolve, 10));
          
          const response = await fetch('https://api.1ewis.com/analytics/question/views', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              PK: questionId,
              SK: questionSK || ''
            })
          });
          
          if (response.ok) {
            console.log('View logged successfully');
          } else {
            console.error('Failed to log view: API returned error status');
          }
        } catch (analyticsErr) {
          console.error('Failed to log view:', analyticsErr);
        }
      } else {
        console.log('View already logged, skipping analytics call');
      }
    }
    
    async function fetchQuestionData() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.1ewis.com/question/retrieve?pk=${id}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setQuestionData(data);
        setError(null);
        
        // Log the view after we've successfully fetched the question data
        // This is in a separate function call to ensure it only happens once
        logQuestionView(id, data.SK);
      } catch (err) {
        setError('Failed to load question data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined' && id) {
      fetchQuestionData();
    }
  }, [id]);
  
  // Handle back button
  const handleBack = () => {
    router.push('/qa');
  };

  // Handle beta signup
  const handleBetaSignup = (email) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // In a real implementation, you would make an API call here
      // const response = await fetch('https://api.1ewis.com/beta/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
    }, 1000);
  };
  
  // Loading state
  if (isLoading) {
    return <LoadingState onBack={handleBack} />;
  }
  
  // Error state
  if (error) {
    return <ErrorState error={error} onBack={handleBack} onRetry={() => router.reload()} />;
  }
  
  // No data state
  if (!questionData) {
    return <EmptyState onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <QuestionDetailHead questionData={questionData} id={id} />
      <QuestionStructuredData questionData={questionData} />
      
      {/* Glossary panel */}
      <div id="glossary-panel">
        <span className="close-btn" onClick={() => document.getElementById('glossary-panel').style.display = 'none'}>×</span>
        <h4 id="glossary-term-title"></h4>
        <p id="glossary-term-description"></p>
      </div>
      
      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton onClick={handleBack} />
        </div>
        <QuestionCard questionData={questionData} enhanceContent={enhanceContent} />
        <AnswersList answers={questionData.answers} enhanceContent={enhanceContent} />
        <BetaCallToAction onJoinClick={() => setShowBetaModal(true)} />
      </main>

      <Footer />

      {/* Beta Signup Modal */}
      {showBetaModal && (
        <BetaSignupModal 
          onClose={() => setShowBetaModal(false)}
          email={email}
          setEmail={setEmail}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          submitError={submitError}
          onSubmit={handleBetaSignup}
        />
      )}
    </div>
  );
}
