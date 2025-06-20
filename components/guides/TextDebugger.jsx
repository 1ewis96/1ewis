import React from 'react';

const TextDebugger = ({ text }) => {
  if (!text) return <div className="text-red-500">No text provided</div>;

  // Create a version with visible newline characters
  const debugText = text.replace(/\n/g, '⏎\n');
  
  // Different rendering approaches to test
  const approaches = [
    {
      name: "Raw Text (pre tag)",
      render: () => <pre className="whitespace-pre-wrap">{text}</pre>
    },
    {
      name: "Debug View (visible newlines)",
      render: () => <pre className="font-mono text-xs">{debugText}</pre>
    },
    {
      name: "Split by newlines with br tags",
      render: () => text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))
    },
    {
      name: "Using CSS white-space property",
      render: () => <div className="whitespace-pre-wrap">{text}</div>
    },
    {
      name: "Using dangerouslySetInnerHTML",
      render: () => <div dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
    }
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-8">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">Text Rendering Debug</h3>
      
      {approaches.map((approach, index) => (
        <div key={index} className="mb-6">
          <div className="bg-gray-800 p-2 rounded mb-2 text-sm font-medium text-cyan-300">
            {approach.name}
          </div>
          <div className="bg-gray-950 p-3 rounded border border-gray-800 text-gray-300">
            {approach.render()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextDebugger;
