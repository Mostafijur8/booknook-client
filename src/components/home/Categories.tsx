import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { label: "Fiction", note: "Stories to get lost in", color: "bg-[#e8eee2]" },
  { label: "Science", note: "Ideas that open minds", color: "bg-[#e5edf0]" },
  { label: "History", note: "Journeys through time", color: "bg-[#f1e7da]" },
  { label: "Kids", note: "Big adventures for little readers", color: "bg-[#f2ebce]" },
  { label: "Others", note: "Something unexpected", color: "bg-[#eee5ed]" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">Follow your curiosity</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Browse by category</h2>
        </div>
        <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">All books <ArrowRight className="size-4" aria-hidden="true" /></Link>
      </div>
      <div className="booknook-stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Link key={category.label} href={`/books?category=${encodeURIComponent(category.label)}`} className={`group rounded-2xl border border-black/5 ${category.color} p-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#40583a]/10`}>
            <span className="font-serif text-2xl">{category.label}</span>
            <span className="mt-2 flex items-center justify-between gap-2 text-sm text-[#68695f]">
              {category.note}<ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
