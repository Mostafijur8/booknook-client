import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { apiRequest } from "@/lib/api";
import type { Book } from "@/types/book";

type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { id } = await params;

  let book: Book;

  try {
    book = await apiRequest<Book>(`/books/${id}`);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#25251f]">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[.8fr_1.2fr] md:items-start lg:px-10 lg:py-16">
        <div className="group flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#e9e7dc] to-[#dfe7d8] shadow-xl shadow-[#40583a]/10">
          {book.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <BookOpen className="size-20 text-[#718768]" aria-hidden="true" />
          )}
        </div>

        <div className="pt-2">
          <span className="inline-flex rounded-full bg-[#eef1e9] px-4 py-2 text-sm font-medium text-[#526b4b]">
            {book.category}
          </span>

          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-[#68695f]">by {book.author}</p>

          <div className="mt-8 border-y border-[#e8e6dd] py-5">
            <h2 className="font-semibold">About this book</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-[#68695f]">
              {book.description ||
                "No description is available for this book yet."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-[#e8e6dd] bg-white p-5 shadow-sm sm:grid-cols-2">
            <div>
              <p className="text-sm text-[#858579]">Available copies</p>
              <p className="mt-1 font-semibold">{book.totalCopies}</p>
            </div>

            <div>
              <p className="text-sm text-[#858579]">Shared by</p>
              <p className="mt-1 font-semibold">
                {book.addedBy?.name || "A BookNook reader"}
              </p>
            </div>
          </div>

          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/books/${id}`)}`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#526b4b] px-7 py-3.5 font-medium text-white transition hover:bg-[#40583a]"
          >
            Log in to borrow
          </Link>
        </div>
      </section>
    </main>
  );
}
