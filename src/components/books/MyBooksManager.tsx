"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Pencil, Plus, Trash2 } from "lucide-react";
import { apiRequestWithAuth } from "@/lib/api-client";
import type { Book } from "@/types/book";
import ToastMessage from "@/components/ui/ToastMessage";

type BooksResponse = Book[] | { books?: Book[]; data?: Book[] };

export default function MyBooksManager({ userEmail }: { userEmail: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequestWithAuth<BooksResponse>("/books?sort=-createdAt")
      .then((result) => {
        const allBooks = Array.isArray(result)
          ? result
          : result.books ?? result.data ?? [];
        if (active) {
          setBooks(allBooks.filter((book) => book.addedBy?.email?.toLowerCase() === userEmail.toLowerCase()));
        }
      })
      .catch((caughtError: unknown) => {
        if (active) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load your books.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userEmail]);

  async function deleteBook() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError("");
    try {
      await apiRequestWithAuth(`/books/${deleteTarget._id}`, { method: "DELETE" });
      setBooks((current) => current.filter((book) => book._id !== deleteTarget._id));
      setNotice(`“${deleteTarget.title}” was deleted.`);
      setDeleteTarget(null);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not delete the book.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <ToastMessage message={notice} onClose={() => setNotice("")} />

      {loading ? (
        <div role="status" className="rounded-2xl border border-[#e8e6dd] bg-white px-6 py-14 text-center text-sm text-[#68695f]">Loading your books…</div>
      ) : books.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book._id} className="overflow-hidden rounded-2xl border border-[#e8e6dd] bg-white shadow-sm">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#e9e7dc]">
                {book.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.image} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
                ) : <BookOpen className="size-12 text-[#718768]" aria-hidden="true" />}
              </div>
              <div className="p-5">
                <span className="rounded-full bg-[#eef1e9] px-3 py-1 text-xs font-medium text-[#526b4b]">{book.category}</span>
                <h2 className="mt-3 line-clamp-2 font-serif text-xl">{book.title}</h2>
                <p className="mt-1 text-sm text-[#77776d]">by {book.author}</p>
                <p className="mt-3 text-xs text-[#858579]">{book.totalCopies} available {book.totalCopies === 1 ? "copy" : "copies"}</p>
                <div className="mt-5 flex gap-2">
                  <Link href={`/my-books/edit/${book._id}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#deddd3] px-4 py-2.5 text-sm font-semibold text-[#40583a] transition hover:bg-[#eef1e9]">
                    <Pencil className="size-4" aria-hidden="true" /> Edit
                  </Link>
                  <button type="button" onClick={() => setDeleteTarget(book)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#efd5cf] px-4 py-2.5 text-sm font-semibold text-[#a04435] transition hover:bg-[#fbefec]">
                    <Trash2 className="size-4" aria-hidden="true" /> Delete
                  </button>
                </div>
                <Link href={`/books/${book._id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">
                  View details <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#c9c8bc] bg-white/70 px-6 py-14 text-center">
          <BookOpen className="mx-auto size-10 text-[#718768]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">Your shelf is empty</h2>
          <p className="mt-2 text-sm text-[#68695f]">Add a book to share it with the BookNook community.</p>
          <Link href="/add-book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#526b4b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#40583a]">
            <Plus className="size-4" aria-hidden="true" /> Add a book
          </Link>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#25251f]/45 p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !deleting) setDeleteTarget(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="delete-book-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h2 id="delete-book-title" className="font-serif text-2xl">Delete this book?</h2>
            <p className="mt-3 leading-6 text-[#68695f]">“{deleteTarget.title}” will be removed from the community shelf.</p>
            <div className="mt-7 flex justify-end gap-3">
              <button type="button" disabled={deleting} onClick={() => setDeleteTarget(null)} className="rounded-full border border-[#deddd3] px-5 py-2.5 text-sm font-semibold text-[#55564e] disabled:opacity-50">Cancel</button>
              <button type="button" disabled={deleting} onClick={() => void deleteBook()} className="rounded-full bg-[#a04435] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{deleting ? "Deleting…" : "Delete book"}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
