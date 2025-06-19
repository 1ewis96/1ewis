import React from 'react';

const CodeBlockEditor = ({ codeBlock, updateCodeBlock }) => {
  // Update code block fields
  const handleCodeBlockChange = (field, value) => {
    updateCodeBlock({
      ...codeBlock,
      [field]: value
    });
  };

  // Language options
  const languageOptions = [
    'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'go',
    'ruby', 'php', 'swift', 'kotlin', 'rust', 'html', 'css', 'json', 'sql',
    'bash', 'powershell', 'yaml', 'markdown'
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Edit Code Block</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
            <select
              value={codeBlock.language}
              onChange={(e) => handleCodeBlockChange('language', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            >
              {languageOptions.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Code</label>
            <textarea
              value={codeBlock.code}
              onChange={(e) => handleCodeBlockChange('code', e.target.value)}
              className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono h-60"
              placeholder="Enter your code here..."
              spellCheck="false"
            />
          </div>
          
          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre text-gray-300">
                {codeBlock.code || '// Your code will appear here'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlockEditor;
