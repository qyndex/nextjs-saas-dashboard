# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SaaS Dashboard — Full-featured SaaS dashboard with authentication, role-based access control, and analytics. Built with Next.js, shadcn/ui, and Supabase.

Built with Next.js 15, React 19, TypeScript 5.9, and Tailwind CSS.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npx tsc --noEmit         # Type check
npm run lint             # ESLint
npm run test             # Unit tests (Vitest)
npm run test:e2e         # E2E tests (Playwright)
```

## Architecture

- `src/app/` — App Router pages and layouts
- `src/components/` — Reusable React components
- `src/lib/` — Utilities, helpers, API clients
- `public/` — Static assets

## Rules

- TypeScript strict mode — no `any` types
- All components must have proper TypeScript interfaces
- Use Tailwind utility classes — no custom CSS files
- ARIA labels on all interactive elements
- Error + loading states on all data-fetching components
- Use `next/image` for all images, `next/link` for navigation
