# BookNook Client — Project Context

This document is a working map of the client repository, based on the source reviewed on 2026-11-03. Re-check the implementation before changing it; this is a guide, not a substitute for current code.

## Project at a glance

- Next.js App Router 16.4.3, React 19.3, TypeScript strict mode, Tailwind CSS v4.
- Import alias: `@/*` → `src/*`.
- React Compiler enabled in `next.config.ts`; Turbopack CSS rule uses `@tailwindcss/turbopack`.
- UI uses Tailwind utilities, shadcn theme tokens, Base UI, Lucide icons, and Swiper on the home hero. Geist and Geist Mono are self-hosted under `public/fonts/` and loaded with `next/font/local` to avoid a build-time Google Fonts network dependency.
- BookNook is a community bookshelf: browse books, add/manage a shelf, borrow and return books, and manage a reader profile.

## Working rules

- Before editing Next.js APIs or conventions, read the relevant guide in `node_modules/next/dist/docs/` for the installed version. For navigation, current route matching uses the client-only `usePathname` hook from `next/navigation`.
- The user prefers Bengali for explanations and summaries. When explicitly asked to implement, edit the project and summarize briefly in Bengali.
- Do not run tests, lint, or builds unless the user asks for verification. `npm run lint` is the configured lint command.
- Never put `.env` values, credentials, tokens, or other secrets in docs. Only document environment variable names and purposes.
- Check source and backend contract before assuming API response shapes or categories.

## App routes

| Route | Source | Behavior |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Home composed of hero slider, new arrivals, how it works, categories, and reader benefits. |
| `/books` | `src/app/books/page.tsx` | Loads books from API; supports `category` and `search` query params. |
| `/books/[id]` | `src/app/books/[id]/page.tsx` | Requires a signed-in user; loads one book and renders borrow details. |
| `/login` | `src/app/login/page.tsx` | Email/password and Google sign-in; safely accepts a local callback path. |
| `/register` | `src/app/register/page.tsx` | Email/password and Google registration. |
| `/add-book` | `src/app/add-book/page.tsx` | Authenticated book creation form. |
| `/my-books` | `src/app/my-books/page.tsx` | Authenticated management of the current user's listings. |
| `/my-books/edit/[id]` | `src/app/my-books/edit/[id]/page.tsx` | Authenticated edit; checks ownership before rendering. |
| `/my-borrows` | `src/app/my-borrows/page.tsx` | Authenticated borrow list and return action. |
| `/profile` | `src/app/profile/page.tsx` | Authenticated profile name/photo editor. |
| `/api/auth/[...all]` | `src/app/api/auth/[...all]/route.ts` | Better Auth GET/POST handler. |

`src/app/layout.tsx` sets Geist fonts and global metadata and wraps pages with the shared navbar and footer. `loading.tsx` and `not-found.tsx` provide app-level loading and 404 UI.

## Source map

- `src/app/`: layouts, route pages, loading/not-found, global CSS, auth route handler.
- `src/components/navbar/`: `Navbar.tsx` owns session-aware public/private links and logout; `DesktopNav.tsx` and `MobileMenu.tsx` render them; `nav-data.ts` defines routes; `Brand.tsx` and `UserMenu.tsx` handle logo/account menu.
- `src/components/footer/Footer.tsx`: shared footer content and Explore links. Active route treatment belongs in the navbar; footer Explore links use hover color.
- `src/components/home/`: homepage sections. `NewArrivals.tsx` gets recent API books; `HeroSlider.tsx` uses Swiper; `Categories.tsx` links to `/books?category=...`; other sections are presentational.
- `src/components/books/`: book detail, borrow modal, book cards, listing/filter components, personal books manager, and borrow list.
- `src/components/forms/`: login/register, Google auth, add/update book, and profile forms.
- `src/components/ui/`: shared button, toast, loading, modal, empty state, and account frame components. Verify each component before reusing; some may be unused or minimal.
- `src/lib/`: API helpers, Better Auth server/client configuration, `requireUser`, and class utility.
- `src/hooks/`: `useBooks.ts` and `useAuth.ts` exist; inspect contents before use (not relied on by the reviewed flows).
- `src/types/`: book, borrow, and user interfaces.
- `src/providers/Providers.tsx`: currently placeholder markup and is not wired into the root layout.
- `public/`: standard Next starter SVG assets; check actual use before replacing/removing.

## Data and API

### Book

`src/types/book.ts` defines `Book` with `_id`, `title`, `author`, `category`, `image`, `description`, `addedBy { name, email }`, `totalCopies`, `createdAt`, and optional `updatedAt`.

Categories currently used by forms, filters, and homepage: `Fiction`, `Science`, `History`, `Kids`, `Others`. Keep these aligned with the backend.

### Borrow and user

`Borrow` in `src/types/borrow.ts` contains `_id`, `bookId`, `bookTitle`, `bookImage`, `userEmail`, `borrowDate`, and `returnDate`. The auth user shape comes primarily from Better Auth (`name`, `email`, optional `image`); `src/types/user.ts` also has a local `User` interface.

### API helpers

- `src/lib/api.ts`: server/general JSON requests to `NEXT_PUBLIC_API_URL`; adds JSON content type and throws response text on non-2xx.
- `src/lib/api-client.ts`: client requests that obtain Better Auth JWT and send it as `Authorization: Bearer ...`; handles JSON, empty bodies, and 204.
- Book endpoints used: `GET /books`, `GET /books/:id`, `POST /books`, `PATCH /books/:id`, `DELETE /books/:id`.
- Borrow endpoints used: `POST /borrows`, `GET /borrows`, `DELETE /borrows/:id`.
- List screens tolerate array responses or `{ books|borrows }` / `{ data }` wrappers. Confirm the API contract before expanding this behavior.
- Public book lists use `cache: "no-store"`; failures currently become empty lists on home/books.

## Authentication and access

- `src/lib/auth.ts` configures Better Auth with MongoDB adapter, email/password, optional Google OAuth, JWT plugin, and Next cookies plugin. `MONGODB_URI` and a `BETTER_AUTH_SECRET` of at least 32 characters are required at module load.
- `src/lib/auth-client.ts` creates the React auth client with JWT client plugin.
- `src/lib/require-user.ts` checks the server session and redirects anonymous users to `/login?callbackUrl=...`.
- `proxy.ts` checks the Better Auth session cookie for `/add-book`, `/my-books`, `/my-borrows`, and `/profile`; page-level `requireUser` remains in place. Book detail also requires a user in its server page.
- Navbar public links are Home and All Books; authenticated users additionally see Add Book, My Books, and My Borrows. Profile is reached from the account menu.
- Current page styling is in both desktop and mobile nav renderers using `usePathname`; child paths (for example `/books/[id]`) match their parent item. Use `aria-current="page"` for the active route.

## UI and styling

- Palette is warm off-white with sage green, rust, and muted gold. Main theme variables are in `src/app/globals.css`.
- Shared layout uses sticky navbar, flex page body, and footer.
- Global CSS includes focus-visible outlines, reduced-motion handling, page entrance, stagger, float, and menu animations.
- Prefer existing Tailwind color values and component conventions when extending UI. Keep keyboard focus visible and label controls accessibly.
- `next/image` is not used for remote book/profile images; current components use `<img>` with local lint suppressions. Do not assume remote image config exists.

## Environment setup

The source references these environment variable names (do not store values here):

- `NEXT_PUBLIC_API_URL`: Express API base URL.
- `MONGODB_URI`, optional `MONGODB_DATABASE`: Better Auth persistence.
- `BETTER_AUTH_SECRET`, optional `BETTER_AUTH_URL`: Better Auth server configuration.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: enable Google OAuth when both are present.
- `NEXT_PUBLIC_IMGBB_API_KEY`: client-side imgbb cover upload key.

`README.md` refers to `.env.example`, but it was not present in the reviewed tracked-file listing; verify before relying on it. Never print or copy `.env` contents into documentation.

## Commands

```powershell
npm install
npm run dev
npm run lint
npm run build
```

Run lint/build/tests only when the user requests verification. There is no test script in the reviewed `package.json`.

## Known details to verify before changes

- The repo's `AGENTS.md` includes Next.js version-specific documentation instructions; obey these on each relevant change.
- Better Auth middleware/proxy only checks for a session cookie; server-side pages also call `requireUser`.
- Category names are a shared frontend/backend contract; keep forms, filters, home links, and API values synchronized.
- `Providers.tsx` is placeholder code; it is not a configured provider stack.
- `src/components/ui/Button.tsx` exists alongside shadcn's lowercase `src/components/ui/button.tsx`; Windows path casing can cause conflicts. Inspect the exact import convention before adding another button component.
- `README.md` is a general setup/features overview; this context file captures source behavior and should be updated when architecture changes.
