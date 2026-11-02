import { BookOpen } from "lucide-react";

type AccountPageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  userName: string;
};

export default function AccountPageFrame({ eyebrow, title, description, userName }: AccountPageFrameProps) {
  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#faf8f3] px-5 py-14 text-[#25251f] sm:px-8">
      <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#e8e6dd] bg-white p-8 shadow-2xl shadow-[#40583a]/[0.07] sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#e8eee2]/70 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <span className="grid size-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-[#526b4b] to-[#718768] text-white shadow-lg shadow-[#526b4b]/20">
            <BookOpen className="size-7" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#718768]">{eyebrow}</p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-xl leading-7 text-[#68695f]">{description}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f1f0e9] px-4 py-2 text-sm text-[#68695f]">
              <span className="size-2 rounded-full bg-[#718768]" aria-hidden="true" />
              Signed in as <span className="font-semibold text-[#40583a]">{userName}</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
