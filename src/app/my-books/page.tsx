import type { Metadata } from "next";
import MyBooksManager from "@/components/books/MyBooksManager";
import { requireUser } from "@/lib/require-user";

export const metadata: Metadata = { title: "BookNook | My Books" };

export default async function MyBooksPage() {
  const user = await requireUser("/my-books");

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#faf8f3] px-5 py-12 text-[#25251f] sm:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#718768]">Your BookNook shelf</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">My Books</h1>
        <p className="mt-4 mb-8 max-w-xl leading-7 text-[#68695f]">Manage the books you have shared with the community.</p>
        <MyBooksManager userEmail={user.email} />
      </section>
    </main>
  );
}
