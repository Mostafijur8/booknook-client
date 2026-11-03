import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { UserAvatar } from "./UserMenu";
import type { NavLink, NavUser } from "./nav-data";

type MobileMenuProps = {
  links: NavLink[];
  user?: NavUser;
  isPending: boolean;
  onLogout: () => void | Promise<void>;
};

export default function MobileMenu({ links, user, isPending, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} className="grid size-11 place-items-center rounded-full border border-[#e1dfd5] bg-white text-[#40583a] transition hover:bg-[#eef1e9]">
        {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button type="button" aria-label="Close navigation menu" onClick={() => setIsOpen(false)} className="absolute inset-0 size-full bg-[#25251f]/20" />
          <nav aria-label="Mobile navigation" className="booknook-menu-enter absolute right-5 top-[88px] z-10 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-[#e8e6dd] bg-white p-3 shadow-xl shadow-[#25251f]/10 sm:right-6">
            {links.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return <Link key={link.href} href={link.href} aria-current={isActive ? "page" : undefined} onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#f3f4ef] hover:text-[#40583a] ${isActive ? "bg-[#e4e9df] text-[#40583a]" : "text-[#55564e]"}`}>
                {link.label}
              </Link>;
            })}
            <div className="my-2 border-t border-[#eeeDE6]" />
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-xl bg-[#f7f6f1] p-3">
                  <UserAvatar user={user} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-[#858579]">{user.email}</p>
                  </div>
                </div>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="mt-1 block rounded-xl px-4 py-3 text-sm font-medium text-[#55564e] transition hover:bg-[#f3f4ef]">My Profile</Link>
                <button type="button" onClick={() => { setIsOpen(false); void onLogout(); }} className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#a04435] transition hover:bg-[#fbefec]">
                  <LogOut className="size-4" aria-hidden="true" /> Logout
                </button>
              </>
            ) : !isPending ? (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="rounded-xl border border-[#e1dfd5] px-4 py-3 text-center text-sm font-semibold text-[#526b4b] transition hover:bg-[#f3f4ef]">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-xl bg-[#526b4b] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#40583a]">Register</Link>
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
