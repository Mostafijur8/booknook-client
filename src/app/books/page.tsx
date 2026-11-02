import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import BookCard from "@/components/home/BookCard";
import { apiRequest } from "@/lib/api";
import type { Book } from "@/types/book";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];
type BooksResponse = Book[] | { books?: Book[]; data?: Book[] };
type BooksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

async function getBooks() {
  try {
    const result = await apiRequest<BooksResponse>("/books?sort=-createdAt", { cache: "no-store" });
    return Array.isArray(result) ? result : result.books ?? result.data ?? [];
  } catch {
    return [];
  }
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const query = await searchParams;
  const category = first(query.category) || "All";
  const search = first(query.search) || "";
  const normalizedSearch = search.trim().toLowerCase();
  const books = await getBooks();
  const visibleBooks = books.filter((book) => {
    const matchesCategory = category === "All" || book.category === category;
    const matchesSearch = !normalizedSearch ||
      book.title.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#faf8f3] px-6 py-12 text-[#25251f] lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">The community bookshelf</p>
        <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">All Books</h1>
            <p className="mt-3 text-[#68695f]">Find a story to enjoy and pass along.</p>
          </div>
          <form action="/books" className="flex w-full max-w-xl gap-2">
            {category !== "All" && <input type="hidden" name="category" value={category} />}
            <label className="flex flex-1 items-center gap-3 rounded-full border border-[#deddd3] bg-white px-4">
              <Search className="size-4 text-[#858579]" aria-hidden="true" />
              <span className="sr-only">Search books by title or author</span>
              <input name="search" type="search" defaultValue={search} placeholder="Search books or authors" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" />
            </label>
            <button type="submit" className="rounded-full bg-[#526b4b] px-5 text-sm font-semibold text-white transition hover:bg-[#40583a]">Search</button>
          </form>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((item) => {
            const params = new URLSearchParams();
            if (item !== "All") params.set("category", item);
            if (search) params.set("search", search);
            const href = params.size ? `/books?${params.toString()}` : "/books";
            return (
              <Link key={item} href={href} className={`rounded-full border px-4 py-2 text-sm transition ${item === category ? "border-[#526b4b] bg-[#526b4b] text-white" : "border-[#e1dfd5] bg-white text-[#55564e] hover:bg-[#eef1e9]"}`}>
                {item}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-b border-[#e8e6dd] pb-4">
          <h2 className="font-serif text-2xl">{category === "All" ? "Browse the shelf" : category}</h2>
          <p className="text-sm text-[#77776d]">{visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"}</p>
        </div>

        {visibleBooks.length ? (
          <div className="booknook-stagger mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleBooks.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[#c9c8bc] bg-white/60 px-6 py-14 text-center">
            <h3 className="font-serif text-2xl">No books found</h3>
            <p className="mt-2 text-sm text-[#68695f]">Try a different search or category.</p>
            <Link href="/books" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">Clear filters <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        )}
      </div>
    </main>
  );
}
