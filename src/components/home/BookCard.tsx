import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Book } from "@/types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e8e6dd] bg-white shadow-sm shadow-[#25251f]/[0.025] transition duration-300 hover:-translate-y-1 hover:border-[#c9d5b7] hover:shadow-xl hover:shadow-[#40583a]/10">
      <Link href={`/books/${book._id}`} className="block">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#e9e7dc]">
          {book.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.image} alt={`Cover of ${book.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <BookOpen className="size-14 text-[#718768]" aria-hidden="true" />
          )}
        </div>
        <div className="p-5">
          <span className="inline-flex rounded-full bg-[#eef1e9] px-3 py-1 text-xs font-medium text-[#526b4b]">{book.category}</span>
          <h3 className="mt-3 line-clamp-2 font-serif text-xl">{book.title}</h3>
          <p className="mt-1 text-sm text-[#77776d]">by {book.author}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b]">
            View Details <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
