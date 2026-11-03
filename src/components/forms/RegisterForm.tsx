"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, ImagePlus, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import GoogleAuthButton from "@/components/forms/GoogleAuthButton";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError("Password must be at least 6 characters and include uppercase and lowercase letters.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: image.trim() || undefined,
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "Could not create your account.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Could not create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Full name</label>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <UserRound className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input id="name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#a1a197]" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Email address</label>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <Mail className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#a1a197]" />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-medium">Photo URL <span className="font-normal text-[#929389]">(optional)</span></label>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <ImagePlus className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input id="image" name="image" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://example.com/photo.jpg" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#a1a197]" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
          <div className="flex items-center gap-3 rounded-xl border border-[#deddd3] bg-white px-4 transition focus-within:border-[#718768] focus-within:ring-4 focus-within:ring-[#718768]/10">
            <LockKeyhole className="size-5 shrink-0 text-[#929389]" aria-hidden="true" />
            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#a1a197]" />
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
          <p className="mt-2 text-xs text-[#858579]">Use at least 6 characters, including uppercase and lowercase letters.</p>
        </div>

        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <Button type="submit" disabled={isLoading} className="group h-12 w-full rounded-xl bg-[#526b4b] text-white hover:bg-[#40583a]">
          {isLoading ? "Creating account…" : "Create account"}
          {!isLoading && <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-[#929389]">
        <span className="h-px flex-1 bg-[#e8e6dd]" /> OR <span className="h-px flex-1 bg-[#e8e6dd]" />
      </div>
      <GoogleAuthButton />

      <p className="mt-6 text-center text-sm text-[#73746b]">
        Already have an account? <Link href="/login" className="font-semibold text-[#526b4b] hover:underline">Log in</Link>
      </p>
    </div>
  );
}
