import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';

function Categories() {
  
  // Categories state
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6'); // Default blue
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  // Mock categories data
  const mockCategories = [
    { id: '1', name: 'Market Updates', color: '#10B981', articleCount: 24 }, // emerald
    { id: '2', name: 'Guides', color: '#3B82F6', articleCount: 18 }, // blue
    { id: '3', name: 'Trending Topics', color: '#8B5CF6', articleCount: 15 }, // violet
    { id: '4', name: 'Exchanges', color: '#EC4899', articleCount: 12 }, // pink
    { id: '5', name: 'Wallets', color: '#F59E0B', articleCount: 9 }, // amber
    { id: '6', name: 'NFTs', color: '#6366F1', articleCount: 8 }, // indigo
    { id: '7', name: 'DeFi', color: '#EF4444', articleCount: 7 }, // red
    { id: '8', name: 'Regulation', color: '#14B8A6', articleCount: 5 }  // teal
  ];

  useEffect(() => {
    // Load mock categories
    setCategories(mockCategories);
  }, []);

  // Handle adding a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    
    const newCategoryObj = {
      id: Date.now().toString(),
      name: newCategory.trim(),
      color: newCategoryColor,
      articleCount: 0
    };
    
    setCategories([...categories, newCategoryObj]);
    setNewCategory('');
    setNewCategoryColor('#3B82F6'); // Reset to default blue
  };

  // Start editing a category
  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditColor(category.color);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditColor('');
  };

  // Save edited category
  const saveEditing = (id) => {
    if (editName.trim() === '') return;
    
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, name: editName.trim(), color: editColor }
        : category
    ));
    
    setEditingId(null);
  };

  // Delete a category
  const handleDeleteCategory = (id) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    
    if (categoryToDelete.articleCount > 0) {
      if (!confirm(`This category contains ${categoryToDelete.articleCount} articles. Are you sure you want to delete it? Articles will need to be reassigned.`)) {
        return;
      }
    } else {
      if (!confirm('Are you sure you want to delete this category?')) {
        return;
      }
    }
    
    setCategories(categories.filter(category => category.id !== id));
  };



  return (
    <>
      <Head>
        <title>Categories | Admin Dashboard | 1ewis.com</title>
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
              Article Categories
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage the categories used to organize your articles
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categories List */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">Existing Categories</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
                  </p>
                </div>
                
                <ul className="divide-y divide-gray-800">
                  {categories.map(category => (
                    <li key={category.id} className="p-4">
                      {editingId === category.id ? (
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                            />
                          </div>
                          <div>
                            <input
                              type="color"
                              value={editColor}
                              onChange={(e) => setEditColor(e.target.value)}
                              className="w-10 h-10 rounded cursor-pointer"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => saveEditing(category.id)}
                              className="p-2 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="p-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{category.name}</h3>
                            <p className="text-gray-400 text-sm">
                              {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditing(category)}
                              className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                  
                  {categories.length === 0 && (
                    <li className="p-6 text-center text-gray-500">
                      No categories found. Add your first category.
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Add New Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Add New Category</h2>
                
                <form onSubmit={handleAddCategory}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="categoryName" className="block text-sm font-medium text-gray-300 mb-1">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-300 mb-1">
                        Category Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          id="categoryColor"
                          value={newCategoryColor}
                          onChange={(e) => setNewCategoryColor(e.target.value)}
                          className="w-10 h-10 rounded cursor-pointer"
                        />
                        <div 
                          className="flex-1 h-10 rounded-lg"
                          style={{ backgroundColor: newCategoryColor }}
                        ></div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Category
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">Tips</h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Use clear, descriptive names for categories</li>
                    <li>• Choose distinct colors to help with visual identification</li>
                    <li>• Categories can be used to filter articles on the frontend</li>
                    <li>• Avoid having too many categories with few articles</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(Categories);
