'use client';

import React, { useState } from 'react';
import HTMLAreaV2 from '@/app/lib/components/HTMLAreaV2';

const HTMLAreaV2Example: React.FC = () => {
  const [content, setContent] = useState(`<p>Welcome to HTMLAreaV2 Demo!</p>
<p>This component features auto-height adjustment and improved toolbar behavior.</p>

<p>Math formula example: $E = mc^2$</p>

<p>Chemical formula with mhchem: $\\ce{H2O}$</p>

<p>Display math:</p>
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

<p>Chemical reaction:</p>
$$\\ce{2H2 + O2 -> 2H2O}$$

<img aria-label="Sample image" speaker="" data_voice_id="" src="https://placehold.co/300x200" alt="Sample" style="max-width: 100%; height: auto;"/>

<p>Try adding more content to see the auto-height feature in action!</p>
<p>Select text and use toolbar buttons to see the improved selection behavior.</p>`);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
    console.log('Content changed:', e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTMLAreaV2 Component Demo</h1>
        <p className="text-gray-600 mb-4">
          This demo showcases the enhanced HTMLAreaV2 component with auto-height adjustment, 
          improved toolbar behavior, and better user experience.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">New Features in V2:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• <strong>Auto-height adjustment:</strong> Editor grows/shrinks based on content</li>
            <li>• <strong>Improved toolbar behavior:</strong> Maintains text selection after button clicks</li>
            <li>• <strong>Height indicator:</strong> Shows current editor height in toolbar</li>
            <li>• <strong>Better selection handling:</strong> Preserves cursor position and selection state</li>
            <li>• <strong>Configurable height limits:</strong> Set minimum and maximum heights</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Features:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Left panel: CodeMirror HTML editor with syntax highlighting</li>
            <li>• Right panel: Live HTML preview with MathJax rendering</li>
            <li>• Toolbar with quick insert buttons for common elements</li>
            <li>• Synchronized scrolling between editor and preview</li>
            <li>• Support for mathematical formulas using $ $ syntax</li>
            <li>• Support for chemical formulas using mhchem extension</li>
            <li>• Voice-enabled spans and images with aria-label attributes</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">How to Test Auto-Height:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Add multiple lines of content to see the editor expand</li>
            <li>• Delete content to see the editor shrink (respecting minimum height)</li>
            <li>• The height indicator in the toolbar shows current dimensions</li>
            <li>• Both editor and preview panels adjust their height automatically</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-800 mb-2">How to Test Selection Behavior:</h3>
          <ul className="text-purple-700 text-sm space-y-1">
            <li>• Select some text in the editor</li>
            <li>• Click any toolbar button (P, 🔊, ∑, 🖼️)</li>
            <li>• Notice how the selection is preserved and the content is wrapped</li>
            <li>• Try with different types of content and toolbar buttons</li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Interactive Editor</h2>
        <HTMLAreaV2
          value={content}
          handleNoteChange={handleContentChange}
          minHeight="300px"
          maxHeight="60000px"
          name="main-html-editor-v2"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Current Content Stats:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Characters:</strong> {content.length}</p>
            <p><strong>Lines:</strong> {content.split('\n').length}</p>
          </div>
          <div>
            <p><strong>Words:</strong> {content.split(/\s+/).filter(word => word.length > 0).length}</p>
            <p><strong>Paragraphs:</strong> {(content.match(/<p>/g) || []).length}</p>
          </div>
        </div>
        
        <h3 className="font-semibold mt-4 mb-2">Sample Math & Chemistry Examples:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><code>$E = mc^2$</code> - Inline math</p>
          <p><code>{`$$\\int_0^1 x^2 dx$$`}</code> - Display math</p>
          <p><code>{`$\\ce{H2O}$`}</code> - Chemical formula</p>
          <p><code>{`$\\ce{2H2 + O2 -> 2H2O}$`}</code> - Chemical reaction</p>
        </div>

        <h3 className="font-semibold mt-4 mb-2">Test Content for Auto-Height:</h3>
        <div className="text-sm text-gray-600">
          <button 
            onClick={() => setContent(content + '\n<p>Additional paragraph to test auto-height expansion.</p>')}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 mb-2"
          >
            Add Content
          </button>
          <button 
            onClick={() => {
              const lines = content.split('\n');
              if (lines.length > 1) {
                setContent(lines.slice(0, -1).join('\n'));
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded mr-2 mb-2"
          >
            Remove Line
          </button>
          <button 
            onClick={() => setContent(`<p>Welcome to HTMLAreaV2 Demo!</p>
<p>This component features auto-height adjustment and improved toolbar behavior.</p>`)}
            className="bg-gray-500 text-white px-3 py-1 rounded mb-2"
          >
            Reset Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLAreaV2Example;