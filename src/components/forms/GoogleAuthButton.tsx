"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function GoogleAuthButton({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
      if (result.error) setError(result.error.message || "Google sign-in failed.");
    } catch {
      setError("Google sign-in is unavailable. Check the Google OAuth settings.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#deddd3] bg-white text-sm font-semibold text-[#3f403a] transition hover:bg-[#f7f6f1]"
      >
        <span className="font-bold text-base text-[#4285f4]" aria-hidden="true">G</span>
        Continue with Google
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
