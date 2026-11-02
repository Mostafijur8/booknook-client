<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook Client Project Guide

This file summarizes the project structure, current implementation, and conventions. Verify details against the source before making changes, since the code can evolve.

## Project Overview

- App: `booknook-client`, a web client for discovering, sharing, and borrowing books.
- Stack: Next.js `16.4.3` App Router, React `19.3.0`, TypeScript with strict mode.
- Styling: Tailwind CSS v4 and shadcn theme setup in `src/app/globals.css`.
- UI setup: shadcn CLI `4.23.0`, Base UI library, Nova preset, Lucide icons.
- Import alias: `@/*` maps to `src/*`.
- React Compiler is enabled in `next.config.ts`.

## Working Conventions

- Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/`. This Next.js version may have changed APIs or conventions; follow deprecation notices.
- The user prefers Bengali, step-by-step copyable instructions when asking how to make changes. If the user explicitly asks the assistant to make the change, edit the project files and summarize it briefly in Bengali.
- Do not run tests or builds unless the user asks for verification.
- Never put secret `.env` values in this file or other documentation.

## Commands

```powershell
npm run dev
npm run lint
npm run build
```

## Routes and Current State

| URL | Source file | Current state |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | BookNook landing page with hero, CSS book-card illustration, category links, CTA, and animations. |
| `/books` | `src/app/books/page.tsx` | Placeholder; book listing and filtering are not wired up. |
| `/books/[id]` | `src/app/books/[id]/page.tsx` | Placeholder detail page. |
| `/login` | `src/app/login/page.tsx` | Placeholder; login form is not wired up. |
| `/register` | `src/app/register/page.tsx` | Placeholder; registration form is not wired up. |
| `/add-book` | `src/app/add-book/page.tsx` | Placeholder; add-book form is not wired up. |
| `/my-books` | `src/app/my-books/page.tsx` | Placeholder. |
| `/my-books/edit/[id]` | `src/app/my-books/edit/[id]/page.tsx` | Placeholder. |
| `/my-borrows` | `src/app/my-borrows/page.tsx` | Placeholder. |
| `/profile` | `src/app/profile/page.tsx` | Placeholder. |

The root layout is `src/app/layout.tsx`; it sets Geist fonts and BookNook metadata.

## Source Structure

- `src/app/`: App Router pages and global CSS.
- `src/components/home/`: Named home component files; currently empty. The home UI is written directly in `src/app/page.tsx`.
- `src/components/books/`: Intended book list/detail/filter/borrow components; currently empty.
- `src/components/forms/`: Intended add/update/login/register forms; currently empty.
- `src/components/navbar/` and `src/components/footer/`: Files exist but are currently empty.
- `src/components/ui/`: `Loading.tsx` and `Button.tsx` are implemented; `Modal.tsx` and `EmptyState.tsx` are empty. shadcn init also created lowercase `button.tsx`.
- `src/hooks/`: `useBooks.ts` and `useAuth.ts` are currently empty.
- `src/lib/api.ts`: JSON API helper using `NEXT_PUBLIC_API_URL`.
- `src/lib/auth.ts` and `src/lib/auth-client.ts`: Currently empty.
- `src/providers/Providers.tsx`: Placeholder markup; no providers are configured yet.
- `src/types/`: Book, Borrow, and User types.

## Data Model and API

`src/types/book.ts` defines `Book` with `_id`, `title`, `author`, `category`, `image`, `description`, `addedBy`, `totalCopies`, `createdAt`, and optional `updatedAt`.

The current `BookCategory` union is `Fiction | Science | History | Kids | Others`. The homepage links also include `Mystery`, `Fantasy`, `Romance`, and `Self-growth`; reconcile these with the backend/API contract before implementing filters.

`src/types/borrow.ts` defines `Borrow` with `_id`, `bookId`, `bookTitle`, `bookImage`, `userEmail`, `borrowDate`, and `returnDate`. `src/types/user.ts` defines `User` with `id`, `name`, `email`, and optional `image`.

`apiRequest<T>(path, options)` in `src/lib/api.ts` requires `NEXT_PUBLIC_API_URL`, sets JSON content type, and throws with the response text for non-2xx responses.

## UI and Animation

- `src/app/globals.css` imports Tailwind v4, `tw-animate-css`, and shadcn theme styles. It defines `animate-fade-up` and `animate-float` plus reduced-motion handling.
- The homepage uses a warm palette: off-white background, sage green, rust, and muted gold.
- Homepage category links use `/books?category=...`; the `/books` route should read this query when filtering is implemented.
- Metadata is configured in `src/app/layout.tsx`.

## Current Caveats

1. Most named component, form, and hook files are empty. Check implementation before importing them.
2. Homepage category names and the `BookCategory` union do not currently match. Confirm the backend's canonical values.
3. `src/components/ui/Button.tsx` and shadcn's `src/components/ui/button.tsx` differ only by filename case. Windows filesystems are usually case-insensitive; use consistent imports and consider consolidating to one canonical component.
4. `src/providers/Providers.tsx` does not yet configure real providers.
5. Homepage book artwork is made from CSS color blocks; it does not load book cover images from the API.
