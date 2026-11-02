import Link from "next/link";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import type { NavUser } from "./nav-data";

export function UserAvatar({ user }: { user: NavUser }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.image} alt={`${user.name}'s profile`} className="size-10 rounded-full border border-[#e1dfd5] object-cover" />
  ) : (
    <span className="grid size-10 place-items-center rounded-full bg-[#dfe7d8] text-sm font-semibold text-[#40583a]">
      {initials || <UserRound className="size-5" aria-hidden="true" />}
    </span>
  );
}

export default function UserMenu({ user, onLogout }: { user: NavUser; onLogout: () => void | Promise<void> }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-transparent p-1.5 pr-3 transition hover:border-[#e8e6dd] hover:bg-white [&::-webkit-details-marker]:hidden">
        <UserAvatar user={user} />
        <span className="max-w-28 truncate text-sm font-semibold text-[#44453e]">{user.name}</span>
        <ChevronDown className="size-4 text-[#858579] transition group-open:rotate-180" aria-hidden="true" />
        <span className="sr-only">Open account menu</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-2xl border border-[#e8e6dd] bg-white p-2 shadow-xl shadow-[#25251f]/10">
        <div className="border-b border-[#eeeDE6] px-3 py-3">
          <p className="truncate text-sm font-semibold text-[#25251f]">{user.name}</p>
          <p className="mt-1 truncate text-xs text-[#858579]">{user.email}</p>
        </div>
        <Link href="/profile" className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-[#55564e] transition hover:bg-[#f3f4ef] hover:text-[#40583a]">My Profile</Link>
        <button type="button" onClick={onLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#a04435] transition hover:bg-[#fbefec]">
          <LogOut className="size-4" aria-hidden="true" /> Logout
        </button>
      </div>
    </details>
  );
}
