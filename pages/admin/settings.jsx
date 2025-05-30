import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { Save, Lock, Globe, Bell, Rss, Key, FileText, AlertTriangle } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';

function Settings() {
  
  // Settings state
  const [settings, setSettings] = useState({
    // General settings
    siteName: '1ewis.com',
    siteDescription: 'Best Crypto Exchanges, Wallets & Tools with Exclusive Bonuses',
    articlesPerPage: 10,
    enableComments: true,
    
    // Admin settings
    adminEmail: 'admin@1ewis.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification settings
    emailNotifications: true,
    commentNotifications: true,
    publishNotifications: true,
    
    // RSS feed settings
    enableRss: true,
    rssItemCount: 20,
    includeFullContent: false
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (settings.newPassword !== settings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (settings.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, this would send the password change to an API
    alert('Password changed successfully');
    setSettings({
      ...settings,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Handle general settings save
  const handleGeneralSettingsSave = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to an API
    alert('General settings saved successfully');
  };

  // Handle notification settings save
  const handleNotificationSettingsSave = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to an API
    alert('Notification settings saved successfully');
  };

  // Handle RSS settings save
  const handleRssSettingsSave = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to an API
    alert('RSS settings saved successfully');
  };

  useEffect(() => {
    // Initialize component
  }, []);



  return (
    <>
      <Head>
        <title>Settings | Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              News Admin Settings
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Configure your news section and admin preferences
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Settings Navigation */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-white">Settings Menu</h2>
                </div>
                <nav className="p-2">
                  <a href="#general" className="flex items-center px-4 py-3 rounded-lg bg-white/5 text-white mb-1">
                    <Globe className="w-5 h-5 mr-3 text-blue-400" />
                    <span>General Settings</span>
                  </a>
                  <a href="#security" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors mb-1">
                    <Lock className="w-5 h-5 mr-3 text-purple-400" />
                    <span>Security</span>
                  </a>
                  <a href="#notifications" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors mb-1">
                    <Bell className="w-5 h-5 mr-3 text-pink-400" />
                    <span>Notifications</span>
                  </a>
                  <a href="#rss" className="flex items-center px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors">
                    <Rss className="w-5 h-5 mr-3 text-orange-400" />
                    <span>RSS Feed</span>
                  </a>
                </nav>
                
                <div className="p-4 mt-4 mx-4 mb-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Changes to these settings will affect how the news section appears and functions on your website.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Settings Forms */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* General Settings */}
              <section id="general" className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-800 flex items-center">
                  <Globe className="w-6 h-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">General Settings</h2>
                </div>
                
                <form onSubmit={handleGeneralSettingsSave} className="p-6 space-y-6">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Site Description
                    </label>
                    <textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="articlesPerPage" className="block text-sm font-medium text-gray-300 mb-1">
                      Articles Per Page
                    </label>
                    <input
                      type="number"
                      id="articlesPerPage"
                      name="articlesPerPage"
                      value={settings.articlesPerPage}
                      onChange={handleChange}
                      min={1}
                      max={50}
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableComments"
                      name="enableComments"
                      checked={settings.enableComments}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                    />
                    <label htmlFor="enableComments" className="ml-2 block text-sm text-gray-300">
                      Enable comments on articles
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save General Settings
                    </button>
                  </div>
                </form>
              </section>
              
              {/* Security Settings */}
              <section id="security" className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-800 flex items-center">
                  <Lock className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Security</h2>
                </div>
                
                <form onSubmit={handlePasswordChange} className="p-6 space-y-6">
                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-300 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    />
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={settings.currentPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={settings.newPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>
              </section>
              
              {/* Notification Settings */}
              <section id="notifications" className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-800 flex items-center">
                  <Bell className="w-6 h-6 text-pink-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                </div>
                
                <form onSubmit={handleNotificationSettingsSave} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={settings.emailNotifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-white">
                          Email Notifications
                        </label>
                      </div>
                      <span className="text-xs text-gray-400">Receive email notifications</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="commentNotifications"
                          name="commentNotifications"
                          checked={settings.commentNotifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                        />
                        <label htmlFor="commentNotifications" className="ml-2 block text-sm text-white">
                          Comment Notifications
                        </label>
                      </div>
                      <span className="text-xs text-gray-400">Get notified when articles receive comments</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="publishNotifications"
                          name="publishNotifications"
                          checked={settings.publishNotifications}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                        />
                        <label htmlFor="publishNotifications" className="ml-2 block text-sm text-white">
                          Publication Notifications
                        </label>
                      </div>
                      <span className="text-xs text-gray-400">Get notified when scheduled articles are published</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-lg hover:from-pink-700 hover:to-red-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </button>
                  </div>
                </form>
              </section>
              
              {/* RSS Feed Settings */}
              <section id="rss" className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center">
                  <Rss className="w-6 h-6 text-orange-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">RSS Feed</h2>
                </div>
                
                <form onSubmit={handleRssSettingsSave} className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableRss"
                        name="enableRss"
                        checked={settings.enableRss}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                      />
                      <label htmlFor="enableRss" className="ml-2 block text-sm text-white">
                        Enable RSS Feed
                      </label>
                    </div>
                    <span className="text-xs text-gray-400">Allow users to subscribe to your content via RSS</span>
                  </div>
                  
                  <div>
                    <label htmlFor="rssItemCount" className="block text-sm font-medium text-gray-300 mb-1">
                      Number of Items in Feed
                    </label>
                    <input
                      type="number"
                      id="rssItemCount"
                      name="rssItemCount"
                      value={settings.rssItemCount}
                      onChange={handleChange}
                      min={1}
                      max={100}
                      className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeFullContent"
                        name="includeFullContent"
                        checked={settings.includeFullContent}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                      />
                      <label htmlFor="includeFullContent" className="ml-2 block text-sm text-white">
                        Include Full Content
                      </label>
                    </div>
                    <span className="text-xs text-gray-400">Include full article content in RSS feed (not just excerpts)</span>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save RSS Settings
                    </button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-900/50 rounded-lg flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-white font-medium">RSS Feed URL</p>
                      <code className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded mt-1 block">
                        https://1ewis.com/news/feed.xml
                      </code>
                    </div>
                  </div>
                </form>
              </section>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(Settings);
