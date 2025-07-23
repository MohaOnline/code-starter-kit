# Project Setup and Configuration

## Environment Setup

1. **Node.js Version**:
   - Ensure Node.js version 18+ is installed
   - Use nvm (Node Version Manager) to manage versions

2. **Dependencies Installation**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create `.env.local` file in project root
   - Add required environment variables:
     ```
     DATABASE_URL="mysql://user:password@localhost:3306/database_name"
     NEXTAUTH_URL="http://localhost:3000"
     NEXTAUTH_SECRET="your_secret_key"
     ```

## Database Configuration

1. **Prisma Setup**:
   - Prisma schema located at `prisma/schema.prisma`
   - Generate Prisma Client:
     ```bash
     npx prisma generate
     ```
   - Run database migrations:
     ```bash
     npx prisma migrate dev
     ```

2. **Database Connection**:
   - Configure connection string in `.env.local`
   - Ensure MySQL server is running
   - Test connection with Prisma Studio:
     ```bash
     npx prisma studio
     ```

## Development Server

1. **Starting the Development Server**:
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:3000`
   - Hot reloading enabled
   - Turbopack used for faster builds

2. **Building for Production**:
   ```bash
   npm run build
   ```
   - Creates optimized production build
   - Outputs to `.next` directory
   - Standalone output configured

3. **Running Production Build**:
   ```bash
   npm run start
   ```
   - Starts production server
   - Uses standalone output
   - Optimized for deployment

## IDE and Tooling Setup

1. **Recommended IDE**: 
   - Visual Studio Code with recommended extensions:
     - ES7+ React/Redux/React-Native snippets
     - Prettier - Code formatter
     - ESLint
     - Tailwind CSS IntelliSense
     - Prisma

2. **Debugging**:
   - Use Chrome DevTools for client-side debugging
   - Use Node.js inspector for server-side debugging
   - VS Code debugger configurations in `.vscode/launch.json`

## Testing Setup

1. **Unit Testing**:
   - Use Jest for unit tests
   - Test files colocated with source files (e.g., `Component.test.js`)
   - Run tests with:
     ```bash
     npm run test
     ```

2. **End-to-End Testing**:
   - Use Cypress for E2E tests
   - Test files in `cypress/e2e/` directory
   - Run tests with:
     ```bash
     npm run test:e2e
     ```

## Deployment Configuration

1. **Standalone Output**:
   - Configured in `next.config.mjs`
   - Optimized for containerized deployments
   - Includes all necessary dependencies

2. **Environment Variables for Production**:
   - Set in deployment platform (Vercel, AWS, etc.)
   - Match variables from `.env.local` but with production values

3. **Custom Server Configuration**:
   - Next.js handles routing automatically
   - Custom server only needed for advanced use cases
   - Standalone output includes server code

## Linting and Formatting

1. **ESLint Configuration**:
   - Configured in `eslint.config.mjs`
   - Based on Next.js recommended rules
   - Custom rules for project-specific needs

2. **Prettier Configuration**:
   - Integrated with ESLint
   - Ensures consistent code formatting
   - Run manually or through IDE

3. **TypeScript Checking**:
   - Type checking with `tsc`
   - Configured in `tsconfig.json`
   - Run with:
     ```bash
     npm run type-check
     ```