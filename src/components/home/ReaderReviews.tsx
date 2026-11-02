import { BookHeart, Compass, UsersRound } from "lucide-react";

const benefits = [
  { icon: Compass, title: "Discover beyond your list", text: "Explore stories from different shelves, genres, and points of view." },
  { icon: BookHeart, title: "Give books another chapter", text: "Pass along books you enjoyed so someone else can find them too." },
  { icon: UsersRound, title: "Read with a community", text: "Connect with readers who believe good stories are worth sharing." },
];

export default function ReaderReviews() {
  return (
    <section className="border-t border-[#e8e6dd] bg-[#f3f1e9]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[.16em] text-[#858579]">A shelf with a little more heart</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Stories bring readers together.</h2>
        </div>
        <div className="booknook-stagger mt-9 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="group rounded-2xl border border-[#e8e6dd] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9d5b7] hover:shadow-xl hover:shadow-[#40583a]/[0.07]">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#eef1e9] text-[#526b4b] transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"><Icon className="size-6" aria-hidden="true" /></span>
              <h3 className="mt-5 font-serif text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68695f]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
