import AddBookForm from "@/components/forms/AddBookForm";
import { requireUser } from "@/lib/require-user";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "BookNook | Add a Book" };

export default async function AddBookPage() {
  const user = await requireUser("/add-book");

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#faf8f3] px-5 py-12 text-[#25251f] sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#718768]">
          Grow the community shelf
        </p>

        <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
          Share a book
        </h1>

        <p className="mt-4 max-w-xl leading-7 text-[#68695f]">
          Add a book to the community shelf and help another reader find their
          next great read.
        </p>

        <div className="mt-8 rounded-3xl border border-[#e8e6dd] bg-white p-6 shadow-xl shadow-[#40583a]/[0.06] sm:p-9">
          <AddBookForm userName={user.name} userEmail={user.email} />
        </div>
      </section>
    </main>
  );
}
