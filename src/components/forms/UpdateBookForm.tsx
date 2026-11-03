"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequestWithAuth } from "@/lib/api-client";
import type { Book } from "@/types/book";
import ToastMessage from "@/components/ui/ToastMessage";

const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const;

type ImgbbResponse = {
  success: boolean;
  data?: { url: string };
  error?: { message?: string };
};

export default function UpdateBookForm({ book }: { book: Book }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputClassName = "mt-2 w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3 text-sm outline-none focus:border-[#718768] focus:ring-2 focus:ring-[#718768]/20";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const selectedImage = formData.get("image");

    try {
      let image = book.image;
      if (selectedImage instanceof File && selectedImage.size > 0) {
        const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!key) throw new Error("Image upload is not configured.");
        const uploadData = new FormData();
        uploadData.set("image", selectedImage);
        const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, { method: "POST", body: uploadData });
        const uploadResult = (await uploadResponse.json()) as ImgbbResponse;
        if (!uploadResponse.ok || !uploadResult.success || !uploadResult.data?.url) {
          throw new Error(uploadResult.error?.message || "Could not upload the new cover.");
        }
        image = uploadResult.data.url;
      }

      await apiRequestWithAuth(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: String(formData.get("title")).trim(),
          author: String(formData.get("author")).trim(),
          category: String(formData.get("category")),
          image,
          description: String(formData.get("description")).trim(),
          totalCopies: Number(formData.get("totalCopies")),
        }),
      });
      setSuccess("Book updated successfully.");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not update the book.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <ToastMessage message={success} onClose={() => setSuccess("")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Book Title<input name="title" required maxLength={160} defaultValue={book.title} className={inputClassName} /></label>
        <label className="block text-sm font-semibold">Author Name<input name="author" required maxLength={120} defaultValue={book.author} className={inputClassName} /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Category<select name="category" required defaultValue={book.category} className={inputClassName}>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="block text-sm font-semibold">Total Copies<input name="totalCopies" type="number" min={0} step={1} required defaultValue={book.totalCopies} className={inputClassName} /></label>
      </div>
      <label className="block text-sm font-semibold">Replace Book Image <span className="font-normal text-[#858579]">(optional)</span><input name="image" type="file" accept="image/*" className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-[#eef1e9] file:px-4 file:py-2 file:font-semibold file:text-[#40583a]`} /></label>
      <label className="block text-sm font-semibold">Short Description<textarea name="description" required minLength={10} maxLength={1000} rows={5} defaultValue={book.description} className={`${inputClassName} resize-y`} /></label>
      <button type="submit" disabled={isSubmitting} className="rounded-full bg-[#526b4b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#40583a] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Saving changes…" : "Save Changes"}</button>
    </form>
  );
}
