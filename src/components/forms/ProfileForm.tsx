"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera, Mail, ShieldCheck, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ToastMessage from "@/components/ui/ToastMessage";

type ProfileFormProps = {
  name: string;
  email: string;
  image?: string | null;
};

export default function ProfileForm({ name: initialName, email, image: initialImage }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedImage = image.trim();
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (trimmedImage) {
      try {
        const photoUrl = new URL(trimmedImage);
        if (photoUrl.protocol !== "http:" && photoUrl.protocol !== "https:") {
          throw new Error("Unsupported photo URL protocol.");
        }
      } catch {
        setError("Enter a valid photo URL, or leave it empty to remove your photo.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (result.error) {
        setError(result.error.message || "Could not update your profile.");
        return;
      }

      setSuccess("Your profile was updated.");
      router.refresh();
    } catch {
      setError("Could not update your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const inputClassName = "mt-2 w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3 text-sm text-[#25251f] outline-none transition placeholder:text-[#a09f94] focus:border-[#718768] focus:ring-2 focus:ring-[#718768]/20";
  const initials = name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-[#e8e6dd] bg-white shadow-2xl shadow-[#40583a]/[0.07] lg:grid-cols-[.82fr_1.18fr]">
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <ToastMessage message={success} onClose={() => setSuccess("")} />

      <aside className="relative overflow-hidden bg-gradient-to-br from-[#263b30] via-[#40583a] to-[#718768] p-7 text-white sm:p-9 lg:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-60 rounded-full bg-white/[0.06] blur-2xl" aria-hidden="true" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
            <ShieldCheck className="size-4" aria-hidden="true" /> BookNook Reader
          </span>

          <div className="mt-10 grid size-28 place-items-center overflow-hidden rounded-[2rem] border border-white/25 bg-white/15 text-3xl font-semibold shadow-xl shadow-black/10 ring-4 ring-white/10">
            {image.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={`${name || "Profile"} profile preview`} className="h-full w-full object-cover" />
            ) : initials || <UserRound className="size-11 text-white/80" aria-hidden="true" />}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[.2em] text-white/60">Profile preview</p>
          <h2 className="mt-2 break-words font-serif text-3xl leading-tight sm:text-4xl">{name.trim() || "Your name"}</h2>

          <div className="mt-6 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-black/[0.12] p-4">
            <Mail className="mt-0.5 size-4 shrink-0 text-white/70" aria-hidden="true" />
            <p className="min-w-0 break-all text-sm leading-6 text-white/85">{email}</p>
          </div>

          <p className="mt-6 max-w-xs text-sm leading-6 text-white/65">Your name and photo appear across your BookNook account.</p>
        </div>
      </aside>

      <section className="p-6 sm:p-9 lg:p-10">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#718768]">Account settings</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight">Personal details</h2>
            <p className="mt-2 text-sm leading-6 text-[#68695f]">Keep your reader profile up to date.</p>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eef1e9] text-[#526b4b]">
            <Camera className="size-5" aria-hidden="true" />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-semibold">
            Full Name
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={120}
              required
              className={inputClassName}
            />
          </label>

          <label className="block text-sm font-semibold">
            Email Address
            <input
              type="email"
              value={email}
              readOnly
              className={`${inputClassName} bg-[#f7f6f1] text-[#68695f]`}
            />
            <span className="mt-1 block text-xs font-normal text-[#858579]">Email address is read-only.</span>
          </label>

          <label className="block text-sm font-semibold">
            Profile Photo URL
            <input
              name="image"
              type="url"
              autoComplete="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://example.com/photo.jpg"
              className={inputClassName}
            />
            <span className="mt-1 block text-xs font-normal text-[#858579]">Paste a public image link. Clear the field to use your initials.</span>
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#526b4b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#40583a] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSaving ? "Saving…" : "Save Profile"}
          </button>
        </form>
      </section>
    </div>
  );
}
