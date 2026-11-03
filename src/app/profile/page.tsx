import type { Metadata } from "next";
import ProfileForm from "@/components/forms/ProfileForm";
import { requireUser } from "@/lib/require-user";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#faf8f3] px-5 py-12 text-[#25251f] sm:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#718768]">Your reader account</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">My Profile</h1>
        <p className="mt-4 mb-8 max-w-xl leading-7 text-[#68695f]">Update the name and photo shown on your BookNook account.</p>

        <ProfileForm name={user.name} email={user.email} image={user.image} />
      </section>
    </main>
  );
}
