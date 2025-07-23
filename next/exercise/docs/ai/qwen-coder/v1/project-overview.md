# Project Overview

## Basic Information
- **Project Name**: exercise
- **Framework**: Next.js (App Router)
- **Language**: JavaScript (with some TypeScript type definitions)
- **Styling**: Tailwind CSS with Typography plugin
- **Component Library**: shadcn/ui (based on Radix UI and Tailwind CSS)

## Key Features and Functionality
1. **Core Framework**: 
   - Next.js 15+ with App Router
   - React 19+
   - Server Components and Server Actions enabled

2. **UI/UX**:
   - Dark mode support via `next-themes`
   - Responsive design with Tailwind CSS
   - Pre-configured shadcn/ui components
   - Custom fonts (Geist) loaded via CSS

3. **State Management**:
   - Jotai for global state management
   - React Context for theme and authentication

4. **Authentication**:
   - NextAuth.js for authentication handling

5. **Database**:
   - Prisma ORM with MySQL database connector
   - Server actions for data mutations

6. **Text Editing**:
   - Lexical editor
   - Tiptap editor
   - CodeMirror for code editing

7. **Audio/Visual**:
   - Howler.js for audio playback
   - Wavesurfer.js for waveform visualization
   - Math rendering with MathJax and KaTeX

8. **Utilities**:
   - Toast notifications via react-toastify
   - Drag and drop with @dnd-kit
   - UUID generation
   - Environment variable management with dotenv

## Project Structure
```
.
├── src/
│   ├── app/              # App Router pages and layouts
│   ├── components/       # Reusable UI components (shadcn/ui)
│   ├── lib/              # Utility functions and helpers
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── prisma/               # Prisma schema and migrations
├── refs/                 # Reference materials and documentation
└── scripts/              # Utility scripts
```

## Development Workflow
- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Linting**: `npm run lint`

## Key Dependencies
- **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui components
- **Backend**: Prisma, MySQL, NextAuth.js
- **Utilities**: Jotai, Howler.js, Wavesurfer.js, MathJax, KaTeX
- **Development**: ESLint, TypeScript (for type checking)

## Special Configurations
- Custom Next.js configuration for allowed origins in development
- Tailwind CSS with Typography plugin
- shadcn/ui component library integration
- Custom font loading via CSS