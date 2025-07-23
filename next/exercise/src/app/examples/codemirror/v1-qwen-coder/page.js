'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

// Dynamically import CodeMirror to avoid SSR issues
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false }
);

// Dynamically import HTML language support
const loadHtmlLanguage = () => import('@codemirror/lang-html').then((mod) => mod.html());

// Dynamically import theme
const loadTheme = () => import('@codemirror/theme-one-dark').then((mod) => mod.oneDark);

export default function CodeMirrorExample() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph with a <strong>bold</strong> word.</p>
  
  <ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ol>
  
  <ul>
    <li>Bullet point 1</li>
    <li>Bullet point 2</li>
  </ul>
  
  <table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
    <tr>
      <td>Row 1, Col 1</td>
      <td>Row 1, Col 2</td>
    </tr>
    <tr>
      <td>Row 2, Col 1</td>
      <td>Row 2, Col 2</td>
    </tr>
  </table>
  
  <p>Inline math: \(E = mc^2\)</p>
  
  <p>Block math:</p>
  \[ 
  \int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
  \]
</body>
</html>`);
  
  const [previewHtml, setPreviewHtml] = useState('');
  const iframeRef = useRef(null);

  // Update preview when code changes
  useEffect(() => {
    setPreviewHtml(code);
  }, [code]);

  // Apply formatting to selected text
  const applyFormat = (tag) => {
    setCode(prevCode => {
      const textarea = document.createElement('textarea');
      textarea.value = prevCode;
      document.body.appendChild(textarea);
      
      // Create a temporary div to manipulate the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = prevCode;
      
      // For simplicity, we'll just wrap the entire content in the tag
      // In a real implementation, you would want to handle selection properly
      return `<${tag}>${prevCode}</${tag}>`;
    });
  };

  // Insert HTML snippet
  const insertSnippet = (snippet) => {
    setCode(prevCode => prevCode + snippet);
  };

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'MATHJAX_RENDERED') {
        // MathJax has finished rendering in the iframe
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>CodeMirror HTML Editor with LaTeX Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button onClick={() => applyFormat('h1')}>H1</Button>
                <Button onClick={() => applyFormat('h2')}>H2</Button>
                <Button onClick={() => applyFormat('h3')}>H3</Button>
                <Button onClick={() => applyFormat('strong')}>Bold</Button>
                <Button onClick={() => applyFormat('em')}>Italic</Button>
                <Button onClick={() => insertSnippet('\n<ul>\n  <li></li>\n</ul>\n')}>UL</Button>
                <Button onClick={() => insertSnippet('\n<ol>\n  <li></li>\n</ol>\n')}>OL</Button>
                <Button onClick={() => insertSnippet('\n<table>\n  <tr>\n    <th>Header</th>\n  </tr>\n  <tr>\n    <td>Data</td>\n  </tr>\n</table>\n')}>Table</Button>
                <Button onClick={() => insertSnippet('\n\( \space \)</p>')}>Inline Math</Button>
                <Button onClick={() => insertSnippet('\n\[ \space \]')}>Block Math</Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                {typeof window !== 'undefined' && (
                  <CodeMirror
                    value={code}
                    height="500px"
                    extensions={[loadHtmlLanguage]}
                    onChange={(value) => setCode(value)}
                    theme={loadTheme}
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-4">
              <MathJaxContext>
                <div className="border rounded-md p-4 min-h-[500px]">
                  <iframe
                    ref={iframeRef}
                    title="preview"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                          <script id="MathJax-script" async
                            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
                          </script>
                          <style>
                            body { 
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                              padding: 1rem;
                              margin: 0;
                            }
                            table {
                              border-collapse: collapse;
                              width: 100%;
                            }
                            th, td {
                              border: 1px solid #ddd;
                              padding: 8px;
                              text-align: left;
                            }
                            th {
                              background-color: #f2f2f2;
                            }
                          </style>
                        </head>
                        <body>
                          ${previewHtml}
                          <script>
                            // Notify parent when MathJax is done rendering
                            window.MathJax = {
                              startup: {
                                pageReady: () => {
                                  window.parent.postMessage({ type: 'MATHJAX_RENDERED' }, '*');
                                }
                              }
                            };
                          </script>
                        </body>
                      </html>
                    `}
                    className="w-full h-[500px] border-0"
                  />
                </div>
              </MathJaxContext>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}