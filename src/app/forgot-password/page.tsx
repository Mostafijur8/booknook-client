import { BookOpen } from "lucide-react";
import Link from "next/link";
import PasswordResetRequestForm from "@/components/forms/PasswordResetRequestForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f7f6f1] px-5 py-12 text-[#25251f]">
      <section className="w-full max-w-md rounded-[2rem] border border-[#e8e6dd] bg-white p-7 shadow-xl shadow-[#25251f]/5 sm:p-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b4b]"><BookOpen className="size-5" aria-hidden="true" /> BookNook</Link>
        <h1 className="mt-7 font-serif text-3xl">Reset your password</h1>
        <p className="mb-7 mt-2 text-sm leading-6 text-[#73746b]">Enter the email address for your account and we’ll send a password reset link.</p>
        <PasswordResetRequestForm />
      </section>
    </main>
  );
}
