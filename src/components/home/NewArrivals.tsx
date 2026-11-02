import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import BookCard from "@/components/home/BookCard";
import { apiRequest } from "@/lib/api";
import type { Book } from "@/types/book";

type BooksResponse = Book[] | { books?: Book[]; data?: Book[] };

async function getLatestBooks(): Promise<Book[]> {
  try {
    const result = await apiRequest<BooksResponse>("/books?sort=-createdAt&limit=6", {
      cache: "no-store",
    });
    if (Array.isArray(result)) return result.slice(0, 6);
    return (result.books ?? result.data ?? []).slice(0, 6);
  } catch {
    return [];
  }
}

export default async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">Fresh on the shelf</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">New Arrivals</h2>
          <p className="mt-3 max-w-xl text-[#68695f]">The latest stories shared by our reader community.</p>
        </div>
        <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">
          See All Books <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {books.length ? (
        <div className="booknook-stagger mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[#c9c8bc] bg-white/60 px-6 py-12 text-center">
          <BookOpen className="mx-auto size-9 text-[#718768]" aria-hidden="true" />
          <h3 className="mt-3 font-serif text-xl">New books are on their way</h3>
          <p className="mt-2 text-sm text-[#68695f]">We couldn’t load the latest books right now.</p>
          <Link href="/books" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">
            Browse all books <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="mt-9 text-center">
        <Link href="/books" className="inline-flex items-center gap-2 rounded-full border border-[#d8d7cd] bg-white px-6 py-3 font-medium transition hover:border-[#9da991] hover:bg-[#eef1e9]">
          See All Books <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
