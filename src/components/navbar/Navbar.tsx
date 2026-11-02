"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Brand from "./Brand";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import { privateLinks, publicLinks } from "./nav-data";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const visibleLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e6dd]/80 bg-[#faf8f3]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <Brand />
        <DesktopNav links={visibleLinks} user={user} isPending={isPending} onLogout={handleLogout} />
        <MobileMenu links={visibleLinks} user={user} isPending={isPending} onLogout={handleLogout} />
      </div>
    </header>
  );
}
