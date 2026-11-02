"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

export default function PasswordResetRequestForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (result.error) {
        setError(result.error.message || "Could not request a reset link.");
      } else {
        setMessage("If an account exists for this email, a reset link will be sent.");
      }
    } catch {
      setError("Password reset email could not be sent. Check the email service settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#718768] focus:ring-4 focus:ring-[#718768]/10" />
        </div>
        {message && <p role="status" className="rounded-xl bg-[#eef1e9] px-4 py-3 text-sm text-[#40583a]">{message}</p>}
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-[#526b4b] text-white hover:bg-[#40583a]">
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#73746b]">
        Remember your password? <Link href="/login" className="font-semibold text-[#526b4b] hover:underline">Back to login</Link>
      </p>
    </>
  );
}
