"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!token) {
      setError("This password reset link is missing or invalid.");
      return;
    }
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError("Password must be at least 6 characters and include uppercase and lowercase letters.");
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.resetPassword({ newPassword: password, token });
      if (result.error) {
        setError(result.error.message || "Could not reset password.");
        return;
      }
      router.replace("/login?passwordReset=1");
    } catch {
      setError("Could not reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">New password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required className="w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#718768] focus:ring-4 focus:ring-[#718768]/10" />
          <p className="mt-2 text-xs text-[#858579]">Include uppercase and lowercase letters.</p>
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-[#526b4b] text-white hover:bg-[#40583a]">
          {loading ? "Updating…" : "Reset password"}
        </Button>
      </form>
      {!token && <p className="mt-5 text-center text-sm"><Link href="/forgot-password" className="font-semibold text-[#526b4b] hover:underline">Request a new reset link</Link></p>}
    </>
  );
}
