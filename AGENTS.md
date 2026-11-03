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
| `/` | `src/app/page.tsx` | Landing page with hero slider, new arrivals, how-it-works, categories, and reader reviews. |
| `/books` | `src/app/books/page.tsx` | Loads books from the API and filters by category and title/author search. |
| `/books/[id]` | `src/app/books/[id]/page.tsx` | Loads one book and shows authenticated borrow controls. |
| `/login` | `src/app/login/page.tsx` | Email/password and Google sign-in. |
| `/register` | `src/app/register/page.tsx` | Email/password and Google registration. |
| `/add-book` | `src/app/add-book/page.tsx` | Authenticated book creation form. |
| `/my-books` | `src/app/my-books/page.tsx` | Authenticated management of the current user's listings. |
| `/my-books/edit/[id]` | `src/app/my-books/edit/[id]/page.tsx` | Authenticated edit page with an ownership check. |
| `/my-borrows` | `src/app/my-borrows/page.tsx` | Authenticated borrow list and return action. |
| `/profile` | `src/app/profile/page.tsx` | Authenticated profile editor. |
| `/api/auth/[...all]` | `src/app/api/auth/[...all]/route.ts` | Better Auth GET/POST handler. |

The root layout is `src/app/layout.tsx`; it sets Geist fonts and BookNook metadata.

## Source Structure

- `src/app/`: App Router pages, auth route, global CSS, loading, and not-found UI.
- `src/components/home/`: Hero slider, new arrivals, categories, reviews, and other landing-page sections.
- `src/components/books/`: Book detail, borrow modal, personal book manager, and borrow list.
- `src/components/forms/`: Login/register, Google auth, add/update book, and profile forms.
- `src/components/navbar/` and `src/components/footer/`: Shared navigation, account menu, and footer.
- `src/components/ui/`: Shared button, loading, toast, and account frame components.
- `src/lib/`: API helpers, Better Auth server/client configuration, image processing, and session guard.
- `src/types/`: Book, Borrow, and User types.

## Data Model and API

`src/types/book.ts` defines `Book` with `_id`, `title`, `author`, `category`, `image`, `description`, `addedBy`, `totalCopies`, `createdAt`, and optional `updatedAt`.

The current `BookCategory` union and the homepage links use `Fiction | Science | History | Kids | Others`. Keep these aligned with the backend validation.

`src/types/borrow.ts` defines `Borrow` with `_id`, `bookId`, `bookTitle`, `bookImage`, `userEmail`, `borrowDate`, and `returnDate`. `src/types/user.ts` defines `User` with `id`, `name`, `email`, and optional `image`.

`apiRequest<T>(path, options)` in `src/lib/api.ts` uses the local or deployed Express API URL, sets JSON content type, and throws on non-2xx responses.

## UI and Animation

- `src/app/globals.css` imports Tailwind v4, `tw-animate-css`, and shadcn theme styles. It defines `animate-fade-up` and `animate-float` plus reduced-motion handling.
- The homepage uses a warm palette: off-white background, sage green, rust, and muted gold.
- Homepage category links use `/books?category=...`; the `/books` route should read this query when filtering is implemented.
- Metadata is configured in `src/app/layout.tsx`.

## Current Caveats

- Homepage book artwork is made from CSS color blocks; it does not load book cover images from the API.
- The API must be running and connected to the same MongoDB database as Better Auth for the full borrow flow to work.
