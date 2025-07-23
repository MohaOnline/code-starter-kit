# Development Guidelines

## Getting Started
1. Install dependencies: `npm install`
2. Set up environment variables in `.env.local`
3. Start development server: `npm run dev`
4. Access the application at `http://localhost:3000`

## Component Development
1. **Creating New Components**:
   - Use shadcn/ui generator when possible: `npx shadcn@latest add [component-name]`
   - Place custom components in `src/components/`
   - Export components in `src/components/index.js` if needed

2. **Component Best Practices**:
   - Use TypeScript interfaces for props
   - Implement proper error handling
   - Add accessibility attributes (ARIA)
   - Write unit tests for complex components

## State Management
1. **Using Jotai**:
   - Create atoms in `src/lib/store.js`
   - Use `useAtom` hook to consume atoms
   - Prefer derived atoms for computed values

2. **Server State**:
   - Use Server Actions for data mutations
   - Implement proper loading and error states
   - Handle optimistic updates where appropriate

## Data Fetching
1. **API Routes**:
   - Create API routes in `src/app/api/`
   - Use proper HTTP methods (GET, POST, PUT, DELETE)
   - Implement error handling and validation

2. **Database Operations**:
   - Use Prisma Client for database operations
   - Implement proper error handling
   - Use transactions for related operations

## Styling
1. **Tailwind CSS**:
   - Use utility classes directly in JSX
   - Extract repetitive patterns into components
   - Use `@apply` directive in CSS files for complex styles

2. **Responsive Design**:
   - Use mobile-first approach
   - Test on multiple screen sizes
   - Use responsive variants (`sm:`, `md:`, `lg:`, etc.)

## Testing
1. **Unit Testing**:
   - Write tests for utility functions
   - Test components with React Testing Library
   - Mock external dependencies

2. **Integration Testing**:
   - Test API routes
   - Test database operations
   - Test authentication flows

## Performance Optimization
1. **Code Splitting**:
   - Use dynamic imports for heavy components
   - Implement lazy loading for non-critical resources

2. **Image Optimization**:
   - Use Next.js Image component
   - Specify appropriate sizes and priorities

3. **Bundle Optimization**:
   - Analyze bundle size with webpack-bundle-analyzer
   - Remove unused dependencies
   - Use tree-shaking for libraries

## Security
1. **Authentication**:
   - Use NextAuth.js for authentication
   - Implement proper session management
   - Validate user permissions

2. **Data Validation**:
   - Validate all inputs
   - Use server-side validation for sensitive operations
   - Sanitize user-generated content

## Deployment
1. **Build Process**:
   - Run `npm run build` to create production build
   - Test build locally with `npm run start`

2. **Environment Configuration**:
   - Set environment variables in deployment platform
   - Use different configurations for staging and production

3. **Monitoring**:
   - Implement error tracking
   - Set up performance monitoring
   - Configure logging