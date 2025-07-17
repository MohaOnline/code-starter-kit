Key Principles
- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions
- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage
- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting
- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling
- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

Performance Optimization
- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

Key Conventions
- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
- Favor server components and Next.js SSR.
- Use only for Web API access in small components.
- Avoid for data fetching or state management.

Follow Next.js docs for Data Fetching, Rendering, and Routing.

Next.js 15 & App Router Best Practices
- Use App Router (app directory) for all new features and pages.
- Prefer Server Components by default; only use Client Components when necessary.
- Use TypeScript (.tsx/.ts) file extensions consistently throughout the project.
- Implement proper loading.tsx, error.tsx, and not-found.tsx files for better UX.
- Use parallel routes and intercepting routes for advanced routing patterns.
- Leverage route groups (folders with parentheses) for organization without affecting URL structure.
- Use generateMetadata for dynamic SEO optimization.
- Implement proper data fetching with async/await in Server Components.
- Use Suspense boundaries strategically for progressive loading.
- Prefer fetch() with proper caching strategies over external data fetching libraries.
- Use Server Actions for form submissions and mutations.
- Implement proper error boundaries and error handling.
- Use middleware.ts for authentication, redirects, and request/response manipulation.
- Optimize bundle size with dynamic imports and code splitting.
- Use Next.js Image component with proper sizing and optimization.
- Implement proper TypeScript strict mode configuration.
- Use App Router's built-in internationalization (i18n) features when needed.
- Leverage streaming and partial prerendering for better performance.
- Use proper caching strategies: force-cache, no-store, revalidate.
- Implement proper security headers and CSP policies.

