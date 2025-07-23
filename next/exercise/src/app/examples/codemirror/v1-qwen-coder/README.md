# CodeMirror HTML Editor with LaTeX Support

This example demonstrates a CodeMirror-based HTML editor with real-time preview capabilities, including LaTeX formula rendering.

## Features

- HTML content editing with syntax highlighting
- Real-time preview of HTML content
- LaTeX formula rendering using MathJax
- Toolbar for quick formatting and insertion of HTML elements
- Support for common HTML elements (headers, lists, tables, etc.)

## Implementation Details

- Uses `@uiw/react-codemirror` for the editor component
- Leverages `@codemirror/lang-html` for HTML language support
- Implements real-time preview using an iframe
- Integrates MathJax for LaTeX formula rendering
- Includes a toolbar with common formatting options

## Usage

1. Edit HTML content in the editor tab
2. Switch to the preview tab to see the rendered output
3. Use the toolbar buttons to quickly apply formatting or insert elements
4. LaTeX formulas are automatically rendered in the preview