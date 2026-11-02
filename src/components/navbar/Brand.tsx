import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Brand() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="BookNook home">
      <span className="grid size-10 place-items-center rounded-2xl bg-[#526b4b] text-white shadow-sm shadow-[#526b4b]/20 transition duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 group-hover:shadow-md">
        <BookOpen className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#25251f] sm:text-xl">
        Book<span className="text-[#718768]">Nook</span>
      </span>
    </Link>
  );
}
