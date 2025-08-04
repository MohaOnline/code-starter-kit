'use client';

import React, { useState } from 'react';
import {HTMLArea} from '@/app/lib/components/HTMLArea';

const HTMLAreaExample: React.FC = () => {
  const [content, setContent] = useState(`<p>Welcome to HTMLArea Demo!</p>
<p>This is a <span aria-label="highlighted text" speaker="" data_voice_id="">highlighted span</span> with voice attributes.</p>

<p>Math formula example: $E = mc^2$</p>

<p>Chemical formula with mhchem: $\\ce{H2O}$</p>

<p>Display math:</p>
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

<p>Chemical reaction:</p>
$$\\ce{2H2 + O2 -> 2H2O}$$

<img aria-label="Sample image" speaker="" data_voice_id="" src="https://placehold.co/300x400" alt="Sample" style="max-width: 100%; height: auto;"/>

<p>Try editing the HTML on the left and see the live preview on the right!</p>

<p>Welcome to HTMLArea Demo!</p>
<p>This is a <span aria-label="highlighted text" speaker="" data_voice_id="">highlighted span</span> with voice attributes.</p>

<p>Math formula example: $E = mc^2$</p>

<p>Chemical formula with mhchem: $\\ce{H2O}$</p>

<p>Display math:</p>
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

<p>Chemical reaction:</p>
$$\\ce{2H2 + O2 -> 2H2O}$$

<img aria-label="Sample image" speaker="" data_voice_id="" src="https://placehold.co/300x400" alt="Sample" style="max-width: 100%; height: auto;"/>

<p>Try editing the HTML on the left and see the live preview on the right!</p>
`);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
    console.log('Content changed:', e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTMLArea Component Demo</h1>
        <p className="text-gray-600 mb-4">
          This demo showcases the HTMLArea component with CodeMirror editor, live HTML preview, 
          MathJax support for mathematical formulas, and mhchem extension for chemical formulas.
        </p>
        
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
          <h3 className="font-semibold text-yellow-800 mb-2">Toolbar Buttons:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• <strong>P</strong> - Insert paragraph tags</li>
            <li>• <strong>🔊</strong> - Insert span with voice attributes</li>
            <li>• <strong>∑</strong> - Insert math formula delimiters</li>
            <li>• <strong>🖼️</strong> - Insert image with voice attributes</li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Interactive Editor</h2>
        <HTMLArea
          value={content}
          handleNoteChange={handleContentChange}
          height="500px"
          name="main-html-editor"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Current Content Length:</h3>
        <p className="text-sm text-gray-600">{content.length} characters</p>
        
        <h3 className="font-semibold mt-4 mb-2">Sample Math & Chemistry Examples:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><code>$E = mc^2$</code> - Inline math</p>
          <p><code>{`$$\\int_0^1 x^2 dx$$`}</code> - Display math</p>
          <p><code>{`$\\ce{H2O}$`}</code> - Chemical formula</p>
          <p><code>{`$\\ce{2H2 + O2 -> 2H2O}$`}</code> - Chemical reaction</p>
        </div>
      </div>
    </div>
  );
};

export default HTMLAreaExample;