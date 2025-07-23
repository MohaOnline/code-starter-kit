# Project Conventions and Standards

## Code Style and Formatting
1. **JavaScript/TypeScript**:
   - Uses modern ES6+ syntax
   - Functional components with hooks
   - Prefer arrow functions for component definitions
   - Use JSDoc/TypeDoc comments for complex functions and components

2. **CSS/Tailwind**:
   - Utility-first approach with Tailwind CSS
   - Custom styles in `src/app/globals.css`
   - Responsive design using Tailwind's breakpoints
   - Dark mode support via `dark:` variant

3. **Component Structure**:
   - Use shadcn/ui components as base for UI elements
   - Follow component composition patterns
   - Separate presentational and container components when appropriate
   - Use consistent prop naming (e.g., `onSubmit`, `onChange`)

## File Organization
1. **App Router Structure**:
   - Pages in `src/app/` with `page.js` files
   - Layouts in `src/app/` with `layout.js` files
   - Components in `src/components/`
   - Reusable hooks in `src/hooks/` (if exists)
   - Utility functions in `src/lib/`

2. **Naming Conventions**:
   - PascalCase for component files (e.g., `Button.jsx`)
   - camelCase for utility files (e.g., `utils.js`)
   - Kebab-case for CSS classes
   - UPPERCASE for constants

## Development Practices
1. **Git Workflow**:
   - Feature branches from `main`
   - Descriptive commit messages
   - Pull requests for code review

2. **Testing**:
   - Component testing with Jest and React Testing Library
   - End-to-end testing with Cypress (if applicable)

3. **Performance**:
   - Image optimization with Next.js Image component
   - Code splitting with dynamic imports
   - Bundle analysis with webpack-bundle-analyzer

## Dependencies Management
1. **Adding New Packages**:
   - Use npm for package management
   - Pin versions in `package.json`
   - Regular dependency updates

2. **Version Control**:
   - `.gitignore` includes `node_modules`, `.next`, etc.
   - Commit `package-lock.json` for consistent builds

## Build and Deployment
1. **Environment Variables**:
   - Use `.env.local` for local development
   - Prefix public variables with `NEXT_PUBLIC_`

2. **Production Build**:
   - Optimize images and assets
   - Enable compression
   - Use standalone output for Docker deployments