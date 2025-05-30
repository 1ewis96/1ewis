import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { BarChart2, FileText, Edit, Plus, Eye, Clock, TrendingUp, AlertTriangle, Tag, MessageSquare } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';

function AdminHome() {
  return (
    <>
      <Head>
        <title>Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              News Management Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage your news articles and content
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Dashboard Cards */}
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Article Views</h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    8,742
                  </p>
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +9.3% from last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
                  <BarChart2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Comments</h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    342
                  </p>
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.8% from last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Articles</h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500">
                    156
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Last published: 2 days ago
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-all duration-300">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Categories</h3>
                  <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
                    8
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Active article categories
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300">
                  <Tag className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Published Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        Bitcoin Surges to New All-Time High
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        Market Updates
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        May 28, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        Top 5 Crypto Wallets for Beginners
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        Guides
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        May 27, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        NFT Market Shows Signs of Recovery
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        Trending Topics
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        May 26, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Article Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300 text-left">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">New Article</h3>
                <p className="text-gray-400 text-sm mt-1">Create a new article for the news section</p>
              </button>
              
              <button className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 text-left">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 w-fit mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Drafts</h3>
                <p className="text-gray-400 text-sm mt-1">View and edit your draft articles</p>
              </button>
              
              <button className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-pink-500/50 transition-all duration-300 text-left">
                <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 w-fit mb-4">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Categories</h3>
                <p className="text-gray-400 text-sm mt-1">Manage article categories</p>
              </button>
              
              <button className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-amber-500/50 transition-all duration-300 text-left">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 w-fit mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Scheduled</h3>
                <p className="text-gray-400 text-sm mt-1">View scheduled publications</p>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(AdminHome);
