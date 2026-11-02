import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavLink, NavUser } from "./nav-data";
import UserMenu from "./UserMenu";

type DesktopNavProps = {
  links: NavLink[];
  user?: NavUser;
  isPending: boolean;
  onLogout: () => void;
};

export default function DesktopNav({ links, user, isPending, onLogout }: DesktopNavProps) {
  return (
    <>
      <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-full px-4 py-2.5 text-sm font-medium text-[#68695f] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#40583a] hover:shadow-sm">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        {user ? (
          <UserMenu user={user} onLogout={onLogout} />
        ) : !isPending ? (
          <>
            <Link href="/login" className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#526b4b] transition hover:bg-[#eef1e9]">Login</Link>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#526b4b] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#40583a] hover:shadow-md">
              Register <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
}
