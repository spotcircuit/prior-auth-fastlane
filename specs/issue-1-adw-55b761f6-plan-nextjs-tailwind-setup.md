# Feature: Basic Project Setup

## Metadata
issue_number: 1
adw_id: 55b761f6
issue_json: {"number":1,"title":"Feature: Basic Project Setup","body":"Initialize the Next.js 15 project with TypeScript and Tailwind CSS 4.0.\n\n## Requirements\n\nCreate the foundational project structure including:\n- Next.js 15 with App Router\n- TypeScript configuration\n- Tailwind CSS 4.0 setup\n- Basic folder structure (app/, components/, lib/, types/)\n- ESLint and Prettier configuration\n- Initial README with project overview\n- Package.json with proper dependencies\n\n## Context\n\nThis is the foundation that all other features will build upon. Follow the tech stack specified in the main plan.md:\n- Next.js 15 (React, App Router)\n- TypeScript\n- Tailwind CSS 4.0\n- Bun as package manager\n\n## Acceptance Criteria\n\n- [ ] Next.js 15 project initialized\n- [ ] TypeScript configured and working\n- [ ] Tailwind CSS 4.0 installed and configured\n- [ ] Basic folder structure in place\n- [ ] README documents project setup\n- [ ] All commands run without errors: bun install, bun run dev, bun run build"}

## Feature Description

Initialize a complete Next.js 15 project with TypeScript and Tailwind CSS 4.0 as the foundational infrastructure for the Prior-Auth Fastlane MVP. This feature creates the complete project structure, configuration files, development tooling, and documentation that all subsequent features will build upon. The setup follows the tech stack specified in the project requirements and establishes best practices for type safety, code quality, and modern React development patterns.

## User Story

As a developer
I want a properly configured Next.js 15 project with TypeScript and Tailwind CSS 4.0
So that I can build the Prior-Auth Fastlane application on a solid, type-safe, and modern foundation with excellent developer experience

## Problem Statement

There is currently no application codebase for the Prior-Auth Fastlane MVP. Before any business logic or features can be implemented, we need to establish the foundational project structure with the correct technology stack (Next.js 15 with App Router, TypeScript, Tailwind CSS 4.0, Bun package manager) and essential development tooling (ESLint, Prettier, type-checking). Without this foundation, development cannot proceed.

## Solution Statement

Initialize a Next.js 15 project using the official create-next-app tool configured for the App Router architecture with TypeScript support. Configure Tailwind CSS 4.0 with PostCSS integration for utility-first styling. Set up ESLint and Prettier for consistent code quality and formatting. Create a logical folder structure (app/, components/, lib/, types/) following Next.js conventions. Use Bun as the package manager for fast dependency installation and script execution. Provide comprehensive README documentation explaining the setup, available scripts, and development workflow.

## Relevant Files

Currently no application files exist. This feature creates the complete foundational structure.

### New Files

**Configuration Files:**
- `package.json` - Project dependencies, scripts, and metadata
- `bun.lockb` - Bun lock file for dependency resolution
- `tsconfig.json` - TypeScript compiler configuration with strict mode
- `next.config.js` - Next.js framework configuration
- `tailwind.config.ts` - Tailwind CSS 4.0 configuration
- `postcss.config.js` - PostCSS configuration for Tailwind processing
- `.eslintrc.json` - ESLint configuration with Next.js rules
- `.prettierrc` - Prettier code formatting configuration
- `.prettierignore` - Files to exclude from Prettier
- `.gitignore` - Git exclusions (node_modules, .next, etc.)

**Application Files:**
- `app/layout.tsx` - Root layout component with metadata and Tailwind imports
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind directives

**Directory Structure:**
- `components/` - Reusable React components (with .gitkeep)
- `lib/` - Utility functions and shared logic (with .gitkeep)
- `types/` - Shared TypeScript type definitions (with .gitkeep)
- `public/` - Static assets (with .gitkeep)

**Documentation:**
- `README.md` - Comprehensive project documentation
- `.env.example` - Environment variable template

## Implementation Plan

### Phase 1: Foundation

Initialize the Next.js 15 project using `bun create next-app` with TypeScript, Tailwind CSS, and App Router configuration. This creates the base file structure including package.json, next.config.js, tsconfig.json, and the app/ directory with initial layout and page files. Verify that Bun is properly installed and functioning as the package manager. Review generated configuration files to ensure they match project requirements.

### Phase 2: Core Implementation

Configure Tailwind CSS 4.0 to work optimally with Next.js 15, ensuring the content paths are correct and the CSS is properly imported in the root layout. Set up ESLint with Next.js recommended rules and configure Prettier with consistent formatting standards. Integrate Prettier with ESLint to prevent conflicts. Configure TypeScript with strict mode enabled and proper path aliases (@/* syntax). Create the folder structure for components/, lib/, and types/ directories. Update the root layout and home page with basic content and Tailwind styling to verify the setup works correctly.

### Phase 3: Integration

Write comprehensive README documentation that explains the project purpose, tech stack, getting started instructions, available npm scripts, folder structure, and links to the main project requirements. Create environment variable template files. Add additional npm scripts for type-checking, formatting, and development workflows. Verify all integration points work correctly: TypeScript compilation, Tailwind CSS processing, ESLint validation, Prettier formatting, development server, and production builds.

## Step by Step Tasks

IMPORTANT: Execute every step in order, top to bottom.

### Task 1: Verify Environment Prerequisites

- Confirm Bun is installed: `bun --version` (should be 1.0.0 or higher)
- Verify current directory is the project root
- Ensure no conflicting package.json exists yet

### Task 2: Initialize Next.js 15 Project with Bun

- Run: `bun create next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
- When prompted, select:
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - `src/` directory: No
  - App Router: Yes
  - Import alias: @/*
- Verify package.json contains Next.js 15.x dependencies
- Verify bun.lockb file is generated

### Task 3: Install Dependencies

- Run: `bun install`
- Verify all dependencies install without errors
- Check that node_modules directory is created

### Task 4: Review and Configure TypeScript

- Open tsconfig.json
- Verify or add these settings:
  - `"strict": true`
  - `"noUncheckedIndexedAccess": true`
  - `"noUnusedLocals": true`
  - `"noUnusedParameters": true`
  - `"paths": { "@/*": ["./*"] }`
- Ensure compilerOptions.target is "ES2017" or newer
- Save changes

### Task 5: Configure Tailwind CSS 4.0

- Open tailwind.config.ts
- Verify content array includes: `"./app/**/*.{js,ts,jsx,tsx,mdx}"`, `"./components/**/*.{js,ts,jsx,tsx,mdx}"`
- Keep default theme configuration
- Open app/globals.css
- Verify it includes Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Verify postcss.config.js exists and includes tailwindcss plugin

### Task 6: Configure ESLint

- Review .eslintrc.json
- Ensure it extends: `"next/core-web-vitals"`
- Add additional rules if needed:
  ```json
  {
    "extends": "next/core-web-vitals",
    "rules": {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
  ```

### Task 7: Set Up Prettier

- Create .prettierrc file:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100,
    "endOfLine": "lf"
  }
  ```
- Create .prettierignore file:
  ```
  node_modules
  .next
  out
  public
  *.md
  bun.lockb
  ```
- Install prettier: `bun add -d prettier`

### Task 8: Update Package.json Scripts

- Add or verify these scripts exist:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
  ```

### Task 9: Create Folder Structure

- Create directory: `components/` with .gitkeep file
- Create directory: `lib/` with .gitkeep file
- Create directory: `types/` with .gitkeep file
- Ensure `public/` directory exists with .gitkeep file
- Verify `app/` directory exists

### Task 10: Update Root Layout

- Open app/layout.tsx
- Update with proper metadata and structure:
  ```typescript
  import type { Metadata } from 'next'
  import './globals.css'

  export const metadata: Metadata = {
    title: 'Prior-Auth Fastlane MVP',
    description: 'Clinic-safe prior authorization workflow system',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  ```

### Task 11: Update Home Page

- Open app/page.tsx
- Create a simple welcome page with Tailwind classes:
  ```typescript
  export default function Home() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prior-Auth Fastlane MVP
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Clinic-safe prior authorization workflow system
          </p>
          <div className="inline-flex gap-4">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
              Next.js 15
            </span>
            <span className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold">
              Tailwind CSS 4.0
            </span>
          </div>
        </div>
      </main>
    )
  }
  ```

### Task 12: Create Environment Variable Template

- Create .env.example file:
  ```
  # Database
  DATABASE_URL=

  # Authentication
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=

  # Email (Mailgun)
  MAILGUN_API_KEY=
  MAILGUN_DOMAIN=

  # Storage (Cloudflare R2)
  R2_ACCOUNT_ID=
  R2_ACCESS_KEY_ID=
  R2_SECRET_ACCESS_KEY=
  R2_BUCKET_NAME=

  # LLM APIs
  OPENAI_API_KEY=
  ANTHROPIC_API_KEY=
  ```

### Task 13: Write Comprehensive README

- Update README.md with:
  - Project title and purpose
  - Tech stack overview (Next.js 15, TypeScript, Tailwind CSS 4.0, Bun)
  - Prerequisites (Bun, Node.js version)
  - Getting started instructions
  - Available scripts explanation
  - Folder structure documentation
  - Development workflow
  - Link to main project requirements
  - Contributing guidelines (reference agentic framework)

### Task 14: Update .gitignore

- Ensure .gitignore includes:
  ```
  # dependencies
  node_modules
  .pnp
  .pnp.js

  # testing
  coverage

  # next.js
  .next
  out
  build
  dist

  # env files
  .env
  .env.local
  .env.development.local
  .env.test.local
  .env.production.local

  # debug
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  # local
  .DS_Store
  *.pem

  # typescript
  *.tsbuildinfo
  next-env.d.ts
  ```

### Task 15: Validation

- Run all validation commands below in sequence
- Verify zero errors in type-checking
- Verify zero errors in linting
- Verify zero errors in formatting check
- Verify build completes successfully
- Verify dev server starts without errors
- Manually test http://localhost:3000 displays the home page with Tailwind styling

## Testing Strategy

### Unit Tests

No unit tests required for this foundational setup. Future features will add Vitest or Jest configuration for component and utility testing.

### Integration Tests

Manual verification of all integration points:

1. **Development Server**: Start dev server and verify page loads at http://localhost:3000
2. **Tailwind CSS**: Verify utility classes render correctly with proper styling
3. **TypeScript**: Verify type-checking catches errors and provides IntelliSense
4. **Hot Reload**: Verify changes to files trigger hot module replacement
5. **Production Build**: Verify build process completes and generates optimized bundle
6. **ESLint**: Verify linting catches code quality issues
7. **Prettier**: Verify formatting works consistently across files

### Edge Cases

- **Bun Compatibility**: Verify Bun works correctly with Next.js 15 (no npm/yarn specific issues)
- **Tailwind CSS 4.0**: Verify latest Tailwind version works with Next.js without conflicts
- **TypeScript Strict Mode**: Verify strict type-checking doesn't cause issues with Next.js types
- **ESLint + Prettier**: Verify no conflicts between ESLint rules and Prettier formatting
- **Import Aliases**: Verify @/* import alias works correctly in all files
- **CSS Processing**: Verify PostCSS properly processes Tailwind directives

## Acceptance Criteria

- Next.js 15 project is initialized and functional
- TypeScript is configured with strict mode enabled
- Tailwind CSS 4.0 is installed and working (classes render correctly)
- ESLint is configured with Next.js recommended rules
- Prettier is configured and integrated with ESLint
- Folder structure exists: app/, components/, lib/, types/, public/
- README.md documents the complete setup and workflow
- .env.example template is provided
- `bun install` completes without errors or warnings
- `bun run dev` starts development server successfully on port 3000
- `bun run build` produces production build without errors
- `bun run type-check` passes with zero TypeScript errors
- `bun run lint` passes with zero ESLint errors
- `bun run format:check` passes with zero Prettier errors
- Home page displays with Tailwind styling when visiting http://localhost:3000

## Validation Commands

Execute every command to validate the feature works correctly with zero regressions.

```bash
# 1. Install all dependencies
bun install

# 2. Type check TypeScript (should have zero errors)
bun run type-check

# 3. Lint code (should have zero errors)
bun run lint

# 4. Check code formatting (should have zero errors)
bun run format:check

# 5. Format code (fixes any formatting issues)
bun run format

# 6. Build for production (should complete successfully)
bun run build

# 7. Start development server (manual verification)
bun run dev
# Visit http://localhost:3000
# Verify page loads with:
# - Title: "Prior-Auth Fastlane MVP"
# - Gradient background (blue to indigo)
# - Three colored badges (Next.js, TypeScript, Tailwind CSS)
# - All text and styling renders correctly

# 8. Test hot reload (with dev server running)
# Edit app/page.tsx, change title text, save
# Verify browser updates without full refresh

# 9. Verify build output
ls -la .next/
# Should see: cache/, server/, static/, build manifest files
```

## Notes

- **Critical Foundation**: This is the absolute foundation - all other features depend on this being correct
- **Bun Performance**: Bun is specified as the package manager for significantly faster dependency installation compared to npm/pnpm/yarn
- **App Router**: Next.js 15 uses the App Router (not the legacy Pages Router) for better performance and developer experience
- **Tailwind CSS 4.0**: Latest major version with performance improvements and new features
- **Minimal Dependencies**: Keep the initial setup minimal - don't add unnecessary dependencies yet
- **No Business Logic**: This setup includes zero business logic - it's purely infrastructure and configuration
- **Future Additions**: Subsequent features will add:
  - Database: Neon Serverless Postgres
  - Authentication: Neon Auth
  - Storage: Cloudflare R2
  - Email: Mailgun
  - Queues: Vercel Queues
  - Deployment: Vercel
  - Testing: Vitest + React Testing Library
- **Agentic Framework**: This project uses the 7-Level Agentic Prompt Framework for autonomous development
- **ADW Workflow**: This plan will be executed by the implement.md workflow in an isolated git worktree
