# Technology Stack Overview

## Frontend Technologies
1. **React 19+**
   - Core library for building user interfaces
   - Uses functional components and hooks
   - Server Components for server-rendered UI

2. **Next.js 15+**
   - React framework with App Router
   - File-based routing system
   - Built-in optimizations (image, font, script)
   - Server Actions for server-side mutations

3. **Tailwind CSS**
   - Utility-first CSS framework
   - Responsive design utilities
   - Dark mode support
   - Custom configuration in `tailwind.config.mjs`

4. **shadcn/ui**
   - Component library built on Radix UI
   - Styled with Tailwind CSS
   - Accessible UI components
   - Customizable design system

## State Management
1. **Jotai**
   - Primitive and flexible state management
   - Atom-based approach
   - Integrates well with React

2. **React Context**
   - Built-in React state management
   - Used for theme and authentication context

## Backend Technologies
1. **Prisma**
   - Next-generation ORM
   - Type-safe database client
   - Schema definition in `prisma/schema.prisma`
   - Migrations and data modeling

2. **MySQL**
   - Relational database
   - Used with Prisma Client
   - Connection management through environment variables

## Authentication
1. **NextAuth.js**
   - Authentication library for Next.js
   - Supports multiple providers
   - Session management
   - Credentials-based authentication

## Text Editing
1. **Lexical**
   - Extensible text editor framework
   - Used for rich text editing
   - Plugin architecture

2. **Tiptap**
   - Headless editor framework
   - Based on ProseMirror
   - Highly customizable

3. **CodeMirror**
   - Versatile text editor for code
   - Language support and linting
   - Theming capabilities

## Audio/Visual Libraries
1. **Howler.js**
   - Audio library for web
   - Cross-browser audio playback
   - Supports Web Audio API

2. **Wavesurfer.js**
   - Audio waveform visualization
   - Interactive audio player
   - Plugin system

3. **MathJax**
   - Mathematics rendering engine
   - Supports LaTeX and MathML
   - High-quality mathematical typesetting

4. **KaTeX**
   - Fast math typesetting library
   - Alternative to MathJax
   - Used for static math rendering

## Utilities and Libraries
1. **React Toastify**
   - Notification system
   - Customizable toast messages
   - Easy integration with React

2. **@dnd-kit**
   - Drag and drop toolkit
   - Accessible and performant
   - Flexible API

3. **UUID**
   - Unique identifier generation
   - RFC4122 compliant
   - Used for entity IDs

4. **Sentence Splitter**
   - Text processing utility
   - Splits text into sentences
   - Used for content analysis

## Development Tools
1. **ESLint**
   - JavaScript/TypeScript linter
   - Configured with Next.js and custom rules
   - Code quality enforcement

2. **TypeScript**
   - Typed superset of JavaScript
   - Provides type safety
   - Used for type definitions

3. **Prettier** (implied)
   - Code formatter
   - Ensures consistent code style
   - Integrated with ESLint

## Build and Deployment
1. **Next.js Compiler**
   - Bundles and optimizes application
   - Minifies JavaScript and CSS
   - Generates static assets

2. **Docker** (standalone output)
   - Containerization support
   - Standalone output for deployment
   - Configured in `next.config.mjs`

## Additional Integrations
1. **Azure Cognitive Services**
   - Speech SDK for text-to-speech
   - Used for voice generation
   - Integrated in utility scripts

2. **Environment Variables**
   - Configuration management
   - Secure storage of secrets
   - Dotenv for local development