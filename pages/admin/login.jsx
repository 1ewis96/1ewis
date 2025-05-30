import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Lock, LogIn, Shield, Mail } from 'lucide-react';
import { loginAdmin, isApiKeyValid } from '../../utils/authUtils';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    if (isApiKeyValid()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error || 'Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div 
          className="w-full max-w-md p-8 space-y-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Secure area - Authorized personnel only
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-4 pl-10 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-900/60 backdrop-blur-sm"
                  placeholder="Admin Email"
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-4 pl-10 border border-gray-700 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-900/60 backdrop-blur-sm"
                  placeholder="Admin Password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                className="text-red-500 text-sm font-medium text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <motion.button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-white group-hover:text-white/80" />
                </span>
                {isLoading ? 'Authenticating...' : 'Sign in'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
