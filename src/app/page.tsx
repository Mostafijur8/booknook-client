import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Search, Sparkles } from "lucide-react";

const categories = ["Fiction", "Mystery", "Fantasy", "Romance", "Self-growth", "History"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#25251f]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <BookOpen className="size-6 text-[#56704f]" aria-hidden="true" />
          BookNook
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-[#62635a] md:flex">
          <Link className="transition hover:text-[#25251f]" href="/books">Explore books</Link>
          <Link className="transition hover:text-[#25251f]" href="/my-borrows">My borrows</Link>
          <Link className="transition hover:text-[#25251f]" href="/add-book">Share a book</Link>
        </nav>
        <Link href="/login" className="rounded-full border border-[#d8d7cd] px-5 py-2.5 text-sm font-medium transition hover:bg-white">
          Log in
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 md:grid-cols-[1.05fr_.95fr] md:items-center md:pb-28 md:pt-20 lg:px-10">
        <div className="animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e9eee4] px-4 py-2 text-sm font-medium text-[#56704f]">
            <Sparkles className="size-4" aria-hidden="true" /> A little corner for every reader
          </p>
          <h1 className="max-w-xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Good books find <span className="text-[#718768]">good people.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#68695f]">
            Discover your next favorite, borrow from fellow readers, and pass along the stories you love.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/books" className="inline-flex items-center gap-2 rounded-full bg-[#526b4b] px-6 py-3.5 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#40583a] hover:shadow-lg">
              Find a book <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/add-book" className="rounded-full border border-[#d8d7cd] px-6 py-3.5 font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
              Share your shelf
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-3 text-sm text-[#77776d]">
            <span className="flex -space-x-2" aria-hidden="true">
              <span className="size-8 rounded-full border-2 border-[#faf8f3] bg-[#d7b99e]" />
              <span className="size-8 rounded-full border-2 border-[#faf8f3] bg-[#a9b59e]" />
              <span className="size-8 rounded-full border-2 border-[#faf8f3] bg-[#d8c77f]" />
            </span>
            <span>Readers sharing stories with readers</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg animate-fade-up delay-150">
          <div className="absolute -right-3 -top-4 size-28 animate-float rounded-full bg-[#e7d5af] blur-2xl" />
          <div className="relative rounded-[2rem] bg-[#e9e7dc] p-7 sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-2xl bg-[#718768] p-5 text-white shadow-lg shadow-[#67735e]/15 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <BookOpen className="size-6" aria-hidden="true" />
                <div>
                  <p className="font-serif text-2xl leading-tight">The<br />Secret Garden</p>
                  <p className="mt-2 text-xs text-white/75">Frances Hodgson Burnett</p>
                </div>
              </div>
              <div className="mt-8 flex aspect-[4/5] flex-col justify-between rounded-2xl bg-[#c78663] p-5 text-white shadow-lg shadow-[#99674d]/15 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <Heart className="size-6" aria-hidden="true" />
                <div>
                  <p className="font-serif text-2xl leading-tight">A Book<br />of Comfort</p>
                  <p className="mt-2 text-xs text-white/75">Stories for slower days</p>
                </div>
              </div>
              <div className="-mt-8 flex aspect-[4/5] flex-col justify-between rounded-2xl bg-[#d3b86f] p-5 text-[#393522] shadow-lg shadow-[#887649]/15 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <Sparkles className="size-6" aria-hidden="true" />
                <div>
                  <p className="font-serif text-2xl leading-tight">Small<br />Wonder</p>
                  <p className="mt-2 text-xs text-[#393522]/70">Find joy in the everyday</p>
                </div>
              </div>
              <Link href="/books" className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#b9b8aa] bg-[#f6f4ed] text-center text-[#526b4b] transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg">
                <span className="grid size-12 place-items-center rounded-full bg-white"><Search className="size-5" aria-hidden="true" /></span>
                <span className="font-medium">Your next read<br />is waiting</span>
              </Link>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-3 text-sm font-medium shadow-lg shadow-black/5">
              Read it. Love it. Pass it on. <span aria-hidden="true">✦</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e6dd] bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">Browse by mood</p>
              <h2 className="mt-2 font-serif text-3xl">What are you in the mood for?</h2>
            </div>
            <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">
              Explore all books <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link key={category} href={`/books?category=${encodeURIComponent(category)}`} className="rounded-full border border-[#e1dfd5] bg-[#faf8f3] px-5 py-3 text-sm text-[#55564e] transition hover:border-[#9da991] hover:bg-[#eef1e9] hover:text-[#40583a]">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div>
          <h2 className="font-serif text-3xl">A good story travels.</h2>
          <p className="mt-2 text-[#68695f]">Have a book ready for its next reader?</p>
        </div>
        <Link href="/add-book" className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#25251f] px-6 py-3.5 font-medium text-white transition hover:bg-[#44443b] sm:self-auto">
          Add a book <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
