'use client';

import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

interface NoteData {
  id?: number;
  nbid?: number;
  tid?: number;
  title?: string;
  body?: string;
  question?: string;
  answer?: string;
  figures?: string;
  body_script?: string;
  body_extra?: string;
  note?: string;
  note_extra?: string;
  deleted?: boolean;
  created?: string;
  weight?: string;
}

interface PreviewAreaProps {
  noteData: NoteData;
}

export function PreviewArea({ noteData }: PreviewAreaProps) {
  // MathJax configuration
  const mathJaxConfig = {
    loader: { load: ['[tex]/mhchem'] },
    tex: {
      packages: { '[+]': ['mhchem'] },
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      renderActions: {
        addMenu: [0, '', '']
      },
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      ignoreHtmlClass: 'cm-editor|CodeMirror'
    },
    startup: {
      typeset: false
    }
  };

  const renderSection = (title: string, content: string | undefined) => {
    if (!content || content.trim() === '') return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <MathJax hideUntilTypeset="first">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose max-w-none dark:prose-invert"
            />
          </MathJax>
        </div>
      </div>
    );
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="h-full overflow-auto">
        {/* Title */}
        {noteData.title && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {noteData.title}
            </h2>
          </div>
        )}

        {/* Meta Information */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {noteData.id && (
              <div>
                <span className="font-medium">ID:</span> {noteData.id}
              </div>
            )}
            {noteData.nbid && (
              <div>
                <span className="font-medium">Notebook ID:</span> {noteData.nbid}
              </div>
            )}
            {noteData.tid && (
              <div>
                <span className="font-medium">Type ID:</span> {noteData.tid}
              </div>
            )}
            {noteData.weight && (
              <div>
                <span className="font-medium">Weight:</span> {noteData.weight}
              </div>
            )}
            {noteData.created && (
              <div>
                <span className="font-medium">Created:</span> {new Date(noteData.created).toLocaleString()}
              </div>
            )}
            {noteData.deleted && (
              <div className="col-span-2">
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                  DELETED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        {renderSection('Body', noteData.body)}
        {renderSection('Question', noteData.question)}
        {renderSection('Answer', noteData.answer)}
        {renderSection('Figures', noteData.figures)}
        {renderSection('Body Script', noteData.body_script)}
        {renderSection('Body Extra', noteData.body_extra)}
        {renderSection('Note', noteData.note)}
        {renderSection('Note Extra', noteData.note_extra)}

        {/* Empty State */}
        {!noteData.title && !noteData.body && !noteData.question && !noteData.answer && 
         !noteData.figures && !noteData.body_script && !noteData.body_extra && 
         !noteData.note && !noteData.note_extra && (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">No content to preview</p>
              <p className="text-sm">Start editing to see the preview</p>
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
}