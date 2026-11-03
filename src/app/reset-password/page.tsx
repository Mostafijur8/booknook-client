import { BookOpen } from "lucide-react";
import Link from "next/link";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "BookNook | Choose a New Password" };

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const query = await searchParams;
  const token = Array.isArray(query.token) ? query.token[0] : query.token;

  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f7f6f1] px-5 py-12 text-[#25251f]">
      <section className="w-full max-w-md rounded-[2rem] border border-[#e8e6dd] bg-white p-7 shadow-xl shadow-[#25251f]/5 sm:p-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b]"><BookOpen className="size-5" aria-hidden="true" /> BookNook</Link>
        <h1 className="mt-7 font-serif text-3xl">Choose a new password</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-[#73746b]">Set a new password for your BookNook account.</p>
        <ResetPasswordForm token={token} />
      </section>
    </main>
  );
}
