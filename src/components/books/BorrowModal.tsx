"use client";

import { useState, type FormEvent } from "react";
import { apiRequestWithAuth } from "@/lib/api-client";
import type { Book } from "@/types/book";
import ToastMessage from "@/components/ui/ToastMessage";

type BorrowModalProps = {
  book: Book;
  user: { name: string; email: string };
  onClose: () => void;
  onSuccess: () => void;
};

function localDateAfter(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function BorrowModal({ book, user, onClose, onSuccess }: BorrowModalProps) {
  const [returnDate, setReturnDate] = useState(() => localDateAfter(7));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!returnDate || new Date(`${returnDate}T23:59:59`).getTime() <= Date.now()) {
      setError("Choose a return date in the future.");
      return;
    }

    setSubmitting(true);
    try {
      await apiRequestWithAuth("/borrows", {
        method: "POST",
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: user.email,
          borrowDate: new Date().toISOString(),
          returnDate: new Date(`${returnDate}T23:59:59`).toISOString(),
        }),
      });
      onSuccess();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not borrow this book.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#25251f]/45 p-5" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <section role="dialog" aria-modal="true" aria-labelledby="borrow-title" className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#718768]">Borrow from the community</p>
        <h2 id="borrow-title" className="mt-2 font-serif text-3xl">Confirm your borrow</h2>
        <p className="mt-2 text-sm text-[#68695f]">Borrowing <span className="font-semibold text-[#25251f]">{book.title}</span></p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">Your Name<input readOnly value={user.name} className="mt-2 w-full rounded-xl border border-[#deddd3] bg-[#f7f6f1] px-4 py-3 text-sm font-normal" /></label>
          <label className="block text-sm font-semibold">Your Email<input readOnly value={user.email} className="mt-2 w-full rounded-xl border border-[#deddd3] bg-[#f7f6f1] px-4 py-3 text-sm font-normal" /></label>
          <label className="block text-sm font-semibold">Return Date<input type="date" min={localDateAfter(1)} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required className="mt-2 w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3 text-sm" /></label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" disabled={submitting} onClick={onClose} className="rounded-full border border-[#deddd3] px-5 py-2.5 text-sm font-semibold text-[#55564e] disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={submitting} className="rounded-full bg-[#526b4b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#40583a] disabled:opacity-50">{submitting ? "Confirming…" : "Confirm Borrow"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
