# BookNook

BookNook is a small online library where readers can discover books, share their own copies, borrow from the community, and return books when they are finished.

**Live site:** Add the deployed client URL here after publishing the frontend.

## Features

- Browse the community bookshelf and filter books by category or search by title and author.
- View book details, available copies, and the reader who shared each book.
- Create an account with Better Auth or sign in with Google.
- Add a book with an imgbb cover image, description, category, and copy count.
- Manage your shared books, edit details, and remove listings with a confirmation dialog.
- Borrow available books and manage returns from your personal borrow list.
- Use the responsive layout on desktop, tablet, and mobile screens.

## Tech Stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS v4
- Better Auth with the MongoDB adapter and JWT plugin
- Express/MongoDB API (configured separately)
- imgbb for book cover uploads

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the local values.
3. Configure the API URL, Better Auth, MongoDB, Google OAuth (optional), and imgbb settings.
4. Start the development server with `npm run dev`.
5. Open `http://localhost:3000`.

The client expects the API to provide the `/books` and `/borrows` routes described in the assignment. Authenticated API requests send a Better Auth JWT as a Bearer token. Configure the API to validate that token using the Better Auth JWKS endpoint and to allow the client origin through CORS.

## Environment Variables

See `.env.example` for the required variable names. Do not commit `.env.local` or real secrets.
