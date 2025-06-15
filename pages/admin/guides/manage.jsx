import React, { useState } from 'react';
import Head from 'next/head';
import AdminNavigation from '../../../components/AdminNavigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Plus, ArrowLeft, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import withAdminAuth from '../../../components/withAdminAuth';

function ManageGuidesPage() {
  // This would be replaced with actual data fetching in a real implementation
  const mockGuides = [
    { id: 1, title: 'Beginner\'s Guide to Bitcoin', status: 'Published', date: '2025-06-10' },
    { id: 2, title: 'Understanding Ethereum and Smart Contracts', status: 'Draft', date: '2025-06-12' },
    { id: 3, title: 'How to Choose a Crypto Wallet', status: 'Published', date: '2025-06-08' },
  ];

  return (
    <>
      <Head>
        <title>Manage Guides | 1ewis.com Admin</title>
        <meta name="description" content="Manage guides for 1ewis.com" />
      </Head>
      
      <AdminNavigation />
      
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-gray-900/60 rounded-xl p-8 border border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Manage Guides
            </h1>
            
            <motion.a 
              href="/admin/guides/create"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create New Guide
            </motion.a>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-8"></div>
          
          {/* Guide listing table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Title</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                  <th className="py-3 px-4 text-right text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockGuides.map((guide) => (
                  <motion.tr 
                    key={guide.id} 
                    className="border-b border-gray-800/50 hover:bg-gray-800/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.4)' }}
                  >
                    <td className="py-4 px-4 text-white">{guide.title}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        guide.status === 'Published' 
                          ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                          : 'bg-amber-900/30 text-amber-400 border border-amber-800/50'
                      }`}>
                        {guide.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{guide.date}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <motion.button
                          className="p-1.5 rounded-full bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Guide"
                        >
                          <Eye size={16} />
                        </motion.button>
                        <motion.button
                          className="p-1.5 rounded-full bg-gray-800 text-amber-400 hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit Guide"
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          className="p-1.5 rounded-full bg-gray-800 text-red-400 hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete Guide"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {mockGuides.length === 0 && (
            <div className="p-8 border border-dashed border-gray-700 rounded-lg text-center text-gray-400">
              No guides found. Create your first guide to get started.
            </div>
          )}
        </motion.div>
        </div>
      </main>
    </>
  );
}

export default withAdminAuth(ManageGuidesPage);
