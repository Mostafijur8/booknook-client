import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#faf8f3] px-5 py-16 text-[#25251f]">
      <section className="max-w-lg text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#e8eee2] text-[#526b4b]"><BookOpen className="size-7" aria-hidden="true" /></span>
        <p className="mt-7 text-sm font-semibold uppercase tracking-[.2em] text-[#718768]">404 · Lost your place?</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">This page is off the shelf.</h1>
        <p className="mt-4 leading-7 text-[#68695f]">The page you’re looking for may have moved, or it might not exist.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#526b4b] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#40583a] hover:shadow-lg">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
        </Link>
      </section>
    </main>
  );
}
