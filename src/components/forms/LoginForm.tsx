"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import GoogleAuthButton from "@/components/forms/GoogleAuthButton";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({
  callbackUrl = "/",
  registered = false,
}: {
  callbackUrl?: string;
  registered?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (result.error) {
        setError(result.error.message || "Email or password is incorrect.");
        return;
      }

      router.replace(callbackUrl);
      router.refresh();
    } catch {
      setError("Could not log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {registered && (
        <p className="mb-5 rounded-xl bg-[#eef1e9] px-4 py-3 text-sm text-[#40583a]">
          Account created. Please log in with your new account.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <Mail className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-[#a1a197]"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <LockKeyhole className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-[#a1a197]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="shrink-0 rounded p-1 text-[#929389] transition hover:text-[#526b4b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#526b4b]"
            >
              {showPassword ? (
                <EyeOff className="size-5" aria-hidden="true" />
              ) : (
                <Eye className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <Button type="submit" disabled={isLoading} className="group h-12 w-full rounded-xl bg-[#526b4b] text-white hover:bg-[#40583a]">
          {isLoading ? "Logging in…" : "Log in"}
          {!isLoading && <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-[#929389]">
        <span className="h-px flex-1 bg-[#e8e6dd]" />
        OR CONTINUE WITH
        <span className="h-px flex-1 bg-[#e8e6dd]" />
      </div>

      <GoogleAuthButton callbackUrl={callbackUrl} />

      <p className="mt-7 text-center text-sm text-[#73746b]">
        New to BookNook? <Link href="/register" className="font-semibold text-[#526b4b] hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
