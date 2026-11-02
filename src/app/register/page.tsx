import Link from "next/link";
import { BookOpen } from "lucide-react";
import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f7f6f1] px-5 py-12 text-[#25251f]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#e8e6dd] bg-white shadow-2xl shadow-[#25251f]/[0.08] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#263b30] p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-24 -top-20 size-80 rounded-full border border-white/10" aria-hidden="true" />
          <Link href="/" className="relative flex items-center gap-3 text-xl font-semibold">
            <BookOpen className="size-6 text-[#c9d5b7]" aria-hidden="true" /> BookNook
          </Link>
          <div className="relative">
            <p className="text-sm uppercase tracking-[.16em] text-[#c9d5b7]">Join the reading circle</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight">Good books are meant to travel.</h1>
            <p className="mt-4 leading-7 text-white/65">Create an account to discover, borrow, and share stories with fellow readers.</p>
          </div>
          <p className="relative text-sm text-white/45">A little corner for every reader.</p>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#718768]">Start your story</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">Create an account</h2>
          <p className="mt-3 mb-7 text-sm leading-6 text-[#73746b]">Join BookNook and find your next good read.</p>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
