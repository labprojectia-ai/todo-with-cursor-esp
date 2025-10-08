# My Todo List - Next.js App

## Overview
A Next.js 15 todo list application migrated from Vercel to Replit. Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components.

## Recent Changes (October 8, 2025)
- Migrated project from Vercel to Replit environment
- Configured Next.js to bind to 0.0.0.0:5000 for Replit compatibility
- Installed dependencies with --legacy-peer-deps due to React 19 compatibility
- Set up development workflow and deployment configuration
- Added Replit-specific entries to .gitignore

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui with Radix UI primitives
- **Package Manager**: npm

### Directory Structure
```
/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   └── todo-list.tsx # Todo list component
│   └── lib/
│       └── utils.ts      # Utility functions
├── public/              # Static assets
└── package.json         # Dependencies
```

### Key Configuration
- **Development Server**: Runs on port 5000, binds to 0.0.0.0
- **Deployment**: Configured for Replit autoscale
- **Build**: Standard Next.js build process

## Development

### Running Locally
The development server is configured to run on port 5000:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

## Deployment
The project is configured for Replit's autoscale deployment:
- Build command: `npm run build`
- Start command: `npm run start`
- Deployment type: autoscale (suitable for stateless websites)

## Notes
- Cross-origin warnings in development are expected and handled by Replit automatically
- Dependencies installed with --legacy-peer-deps flag for React 19 compatibility
- The vaul package has peer dependency conflicts with React 19 (expects React 16-18)
