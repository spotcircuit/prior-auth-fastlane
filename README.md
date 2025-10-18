# Prior-Auth Fastlane MVP

Clinic-safe prior authorization workflow system built with Next.js 15, TypeScript, and Tailwind CSS 4.0.

## Tech Stack

- **Framework**: Next.js 15 (React with App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.0
- **Package Manager**: Bun
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel (planned)

## Prerequisites

- **Bun**: 1.0.0 or higher ([Install Bun](https://bun.sh/docs/installation))
- **Node.js**: 20.x or higher (for compatibility)

## Getting Started

### Installation

```bash
# Install dependencies
bun install
```

### Environment Variables

Copy the example environment file and configure your local environment:

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`.

### Development

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint to check code quality
- `bun run type-check` - Run TypeScript compiler to check types
- `bun run format` - Format all files with Prettier
- `bun run format:check` - Check if files are formatted correctly

## Project Structure

```
.
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable React components
├── lib/                   # Utility functions and shared logic
├── types/                 # Shared TypeScript type definitions
├── public/                # Static assets (images, fonts, etc.)
├── .claude/               # Agentic framework configuration
├── specs/                 # Feature specifications and plans
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
├── postcss.config.mjs     # PostCSS configuration for Tailwind
├── .prettierrc            # Prettier configuration
└── .env.example           # Environment variable template
```

## Development Workflow

1. **Create a new feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following TypeScript strict mode
   - Use Tailwind CSS for styling
   - Keep components in `components/`
   - Keep utilities in `lib/`
   - Keep types in `types/`

3. **Check your code**
   ```bash
   bun run type-check    # Verify TypeScript types
   bun run lint          # Check code quality
   bun run format        # Format code
   ```

4. **Test locally**
   ```bash
   bun run build         # Verify production build
   bun run dev           # Test in development mode
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

## Code Quality Standards

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Next.js recommended rules + custom TypeScript rules
- **Prettier**: Consistent code formatting across the project
- **No unused variables or parameters**: Enforced by TypeScript compiler
- **No explicit any types**: Use proper types or unknown

## Agentic Framework

This project uses the 7-Level Agentic Prompt Framework for autonomous development:

- **Level 1**: Autonomous Workflows - Standardized development patterns
- **Level 2**: Self-Planning - Automated feature planning from requirements
- **Level 3**: Control Flow - Conditional logic and error handling
- **Level 4**: Delegation - Specialized sub-agents for complex tasks
- **Level 5**: Advanced Orchestration - Multi-agent coordination
- **Level 6**: Self-Correction - Validation and automatic fixes
- **Level 7**: Learning - Pattern recognition and optimization

See `.claude/` directory for framework configuration and `specs/` for feature specifications.

## Future Additions

The following features will be added in subsequent development phases:

- **Database**: Neon Serverless Postgres
- **Authentication**: Neon Auth
- **Storage**: Cloudflare R2
- **Email**: Mailgun
- **Queues**: Vercel Queues
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## Contributing

This project follows the agentic framework development methodology. All features are planned and implemented through the ADW (Agentic Development Workflow) process:

1. Features are specified in `specs/` directory
2. Development happens in isolated git worktrees
3. Automated validation ensures zero regressions
4. All code follows strict type safety and quality standards

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Bun Documentation](https://bun.sh/docs)
