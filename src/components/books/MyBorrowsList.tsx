"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { apiRequestWithAuth } from "@/lib/api-client";
import type { Borrow } from "@/types/borrow";
import ToastMessage from "@/components/ui/ToastMessage";

type BorrowsResponse = Borrow[] | { borrows?: Borrow[]; data?: Borrow[] };

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export default function MyBorrowsList({ userEmail }: { userEmail: string }) {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    apiRequestWithAuth<BorrowsResponse>("/borrows")
      .then((result) => {
        const rows = Array.isArray(result) ? result : result.borrows ?? result.data ?? [];
        if (active) setBorrows(rows.filter((borrow) => borrow.userEmail?.toLowerCase() === userEmail.toLowerCase()));
      })
      .catch((caughtError: unknown) => {
        if (active) setError(caughtError instanceof Error ? caughtError.message : "Could not load your borrowed books.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [userEmail]);

  async function returnBook(borrow: Borrow) {
    setReturningId(borrow._id);
    setError("");
    setNotice("");
    try {
      await apiRequestWithAuth(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((current) => current.filter((item) => item._id !== borrow._id));
      setNotice(`“${borrow.bookTitle}” has been returned.`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not return the book.");
    } finally {
      setReturningId("");
    }
  }

  return (
    <>
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <ToastMessage message={notice} onClose={() => setNotice("")} />
      {loading ? (
        <div role="status" className="rounded-2xl border border-[#e8e6dd] bg-white px-6 py-14 text-center text-sm text-[#68695f]">Loading your borrowed books…</div>
      ) : borrows.length ? (
        <div className="overflow-hidden rounded-2xl border border-[#e8e6dd] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[#f1f0e9] text-xs uppercase tracking-wide text-[#68695f]"><tr><th className="px-5 py-4">Book</th><th className="px-5 py-4">Borrow Date</th><th className="px-5 py-4">Return Date</th><th className="px-5 py-4">Action</th></tr></thead>
              <tbody className="divide-y divide-[#eeeDE6]">
                {borrows.map((borrow) => (
                  <tr key={borrow._id}>
                    <td className="px-5 py-4"><div className="flex items-center gap-3">
                      {borrow.bookImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={borrow.bookImage} alt="" className="size-12 rounded-lg object-cover" />
                      ) : <span className="grid size-12 place-items-center rounded-lg bg-[#eef1e9]"><BookOpen className="size-5 text-[#526b4b]" aria-hidden="true" /></span>}
                      <div><p className="font-semibold text-[#25251f]">{borrow.bookTitle}</p><Link href={`/books/${borrow.bookId}`} className="mt-1 text-xs font-medium text-[#526b4b] hover:underline">View book</Link></div>
                    </div></td>
                    <td className="px-5 py-4 text-[#68695f]">{formatDate(borrow.borrowDate)}</td>
                    <td className="px-5 py-4 text-[#68695f]">{formatDate(borrow.returnDate)}</td>
                    <td className="px-5 py-4"><button type="button" disabled={returningId === borrow._id} onClick={() => void returnBook(borrow)} className="inline-flex items-center gap-2 rounded-full border border-[#deddd3] px-4 py-2 text-xs font-semibold text-[#40583a] transition hover:bg-[#eef1e9] disabled:opacity-50"><RotateCcw className="size-3.5" aria-hidden="true" />{returningId === borrow._id ? "Returning…" : "Return Book"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#c9c8bc] bg-white/70 px-6 py-14 text-center">
          <BookOpen className="mx-auto size-10 text-[#718768]" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl">No borrowed books yet</h2>
          <p className="mt-2 text-sm text-[#68695f]">Find a book on the community shelf and start reading.</p>
          <Link href="/books" className="mt-6 inline-flex rounded-full bg-[#526b4b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#40583a]">Browse All Books</Link>
        </div>
      )}
    </>
  );
}
