"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequestWithAuth } from "@/lib/api-client";
import { imageFileToDataUrl } from "@/lib/image";
import BookFields from "@/components/forms/add-book/BookFields";
import BookCoverField from "@/components/forms/add-book/BookCoverField";
import ContributorFields from "@/components/forms/add-book/ContributorFields";
import ToastMessage from "@/components/ui/ToastMessage";

type AddBookFormProps = {
  userName: string;
  userEmail: string;
};

export default function AddBookForm({ userName, userEmail }: AddBookFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedFile = formData.get("image");
    const uploadFile = selectedFile instanceof File && selectedFile.size > 0 ? selectedFile : null;
    const submittedImageUrl = String(formData.get("imageUrl") ?? "").trim();

    if (!uploadFile && !submittedImageUrl) {
      setToast({ message: "Upload a book cover or paste an image URL.", variant: "error" });
      return;
    }

    if (!uploadFile) {
      try {
        const parsedImageUrl = new URL(submittedImageUrl);
        if (parsedImageUrl.protocol !== "http:" && parsedImageUrl.protocol !== "https:") {
          throw new Error("Unsupported image URL protocol.");
        }
      } catch {
        setToast({ message: "Enter a valid image URL beginning with http:// or https://.", variant: "error" });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const image = uploadFile ? await imageFileToDataUrl(uploadFile) : submittedImageUrl;

      await apiRequestWithAuth("/books", {
        method: "POST",
        body: JSON.stringify({
          title: String(formData.get("title")).trim(),
          author: String(formData.get("author")).trim(),
          category: String(formData.get("category")),
          image,
          description: String(formData.get("description")).trim(),
          addedBy: { name: userName, email: userEmail },
          totalCopies: Number(formData.get("totalCopies")),
          createdAt: new Date().toISOString(),
        }),
      });

      form.reset();
      setImageUrl("");
      setToast({ message: "Book added successfully!", variant: "success" });
      router.refresh();
    } catch (caughtError) {
      setToast({
        message: caughtError instanceof Error ? caughtError.message : "Could not add the book. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ToastMessage
        message={toast?.message ?? ""}
        variant={toast?.variant ?? "success"}
        onClose={() => setToast(null)}
      />
      <BookFields />
      <BookCoverField imageUrl={imageUrl} onImageUrlChange={setImageUrl} />
      <ContributorFields name={userName} email={userEmail} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#526b4b] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#40583a] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Saving book..." : "Add Book"}
      </button>
    </form>
  );
}
