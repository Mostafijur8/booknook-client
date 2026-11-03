import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateBookForm from "@/components/forms/UpdateBookForm";
import { apiRequest } from "@/lib/api";
import { requireUser } from "@/lib/require-user";
import type { Book } from "@/types/book";

export const metadata: Metadata = { title: "BookNook | Edit Book" };

type EditBookPageProps = { params: Promise<{ id: string }> };

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  const user = await requireUser(`/my-books/edit/${id}`);

  let book: Book;
  try {
    book = await apiRequest<Book>(`/books/${id}`, { cache: "no-store" });
  } catch {
    notFound();
  }

  if (book.addedBy?.email?.toLowerCase() !== user.email.toLowerCase()) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#faf8f3] px-5 py-12 text-[#25251f] sm:px-8">
      <section className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#718768]">Update your shelf</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Edit Book</h1>
        <p className="mt-4 mb-8 leading-7 text-[#68695f]">Update the details readers see on the community shelf.</p>
        <div className="rounded-3xl border border-[#e8e6dd] bg-white p-6 shadow-xl shadow-[#40583a]/[0.06] sm:p-9">
          <UpdateBookForm book={book} />
        </div>
      </section>
    </main>
  );
}
