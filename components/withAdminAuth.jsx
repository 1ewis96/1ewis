import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isApiKeyValid } from '../utils/authUtils';

/**
 * Higher-Order Component (HOC) to protect admin routes
 * Checks for valid API key and redirects to login if not present
 */
export default function withAdminAuth(WrappedComponent) {
  return function WithAdminAuth(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Check if API key is valid
      if (!isApiKeyValid()) {
        // Redirect to login if not authenticated
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    }, [router]);

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading admin panel...</p>
          </div>
        </div>
      );
    }

    // Only render the admin component if authenticated
    if (!isAuthenticated) {
      return null;
    }

    // Pass all props to the wrapped component
    return <WrappedComponent {...props} />;
  };
}
