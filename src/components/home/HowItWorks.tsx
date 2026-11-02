import Link from "next/link";
import { ArrowRight, BookOpen, HandHeart, LibraryBig } from "lucide-react";

const steps = [
  { icon: LibraryBig, title: "Find a story", text: "Explore books shared by readers in the BookNook community." },
  { icon: BookOpen, title: "Borrow and enjoy", text: "Choose a book and enjoy it at your own pace." },
  { icon: HandHeart, title: "Pass it along", text: "Return it when you’re done so another reader can discover it." },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-[#e8e6dd] bg-white/65">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">Simple as turning a page</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">How borrowing works</h2>
          <p className="mt-3 leading-7 text-[#68695f]">A community-powered way to find and share your next good read.</p>
        </div>
        <div className="booknook-stagger mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="group rounded-2xl border border-[#e8e6dd] bg-[#faf8f3] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9d5b7] hover:bg-white hover:shadow-xl hover:shadow-[#40583a]/[0.07]">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#e9eee4] text-[#526b4b] transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"><Icon className="size-6" aria-hidden="true" /></span>
                <span className="font-serif text-3xl text-[#d2d1c5]">0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68695f]">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b] hover:underline">Explore the shelf <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
