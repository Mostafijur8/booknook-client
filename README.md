# BookNook

BookNook is a small online library where readers can discover books, share their own copies, borrow from the community, and return books when they are finished.

**Live site:** https://booknook-tawny.vercel.app

## Features

- Browse the community bookshelf and filter books by category or search by title and author.
- View book details, available copies, and the reader who shared each book.
- Create an account with Better Auth or sign in with Google.
- Add a book with a compressed cover image, description, category, and copy count.
- Manage your shared books, edit details, and remove listings with a confirmation dialog.
- Borrow available books and manage returns from your personal borrow list.
- Use the responsive layout on desktop, tablet, and mobile screens.

## Tech Stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS v4
- Better Auth with the MongoDB adapter and JWT plugin
- Express/MongoDB API (configured separately)
- Browser-side image compression for cover uploads

## Local Setup

1. Install dependencies with `npm install`.
2. Configure the existing `.env` in the client folder with local Better Auth and MongoDB values. Configure the backend's separate `.env` as described in the server README.
3. Keep the local API URL set to `http://localhost:5000`. The client selects the deployed API when opened at the live BookNook URL.
4. Start the development server with `npm run dev`.
5. Open `http://localhost:3000`.

The client expects the API to provide the `/books` and `/borrows` routes described in the assignment. Authenticated API requests send a Better Auth JWT as a Bearer token. Configure the API to validate that token using the Better Auth JWKS endpoint and to allow the client origin through CORS.

## Environment Variables

The client `.env` needs `MONGODB_URI`, `MONGODB_DATABASE`, `BETTER_AUTH_SECRET`, and local `BETTER_AUTH_URL`; Google OAuth variables are optional. Do not commit `.env` or real secrets. Book cover uploads are compressed in the browser and sent in the book `image` field, so no third-party image API key is required.
