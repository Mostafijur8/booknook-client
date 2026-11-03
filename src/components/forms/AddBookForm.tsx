"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiRequestWithAuth } from "@/lib/api-client";
import ToastMessage from "@/components/ui/ToastMessage";

const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const;

type AddBookFormProps = {
  userName: string;
  userEmail: string;
};

type ImgbbResponse = {
  success: boolean;
  data?: {
    url: string;
  };
  error?: {
    message?: string;
  };
};

export default function AddBookForm({ userName, userEmail }: AddBookFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("image");
    const uploadFile = imageFile instanceof File && imageFile.size > 0 ? imageFile : null;
    const submittedImageUrl = String(formData.get("imageUrl") ?? "").trim();

    if (!uploadFile && !submittedImageUrl) {
      setError("Upload a book cover or paste an image URL.");
      return;
    }

    if (!uploadFile) {
      try {
        const parsedImageUrl = new URL(submittedImageUrl);
        if (parsedImageUrl.protocol !== "http:" && parsedImageUrl.protocol !== "https:") {
          throw new Error("Unsupported image URL protocol.");
        }
      } catch {
        setError("Enter a valid image URL beginning with http:// or https://.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      let image = submittedImageUrl;
      if (uploadFile) {
        const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbKey) {
          throw new Error("Image upload is not configured. Please contact the site admin.");
        }

        const uploadData = new FormData();
        uploadData.set("image", uploadFile);
        const uploadResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${encodeURIComponent(imgbbKey)}`,
          { method: "POST", body: uploadData },
        );

        const uploadResult = (await uploadResponse.json()) as ImgbbResponse;

        if (!uploadResponse.ok || !uploadResult.success || !uploadResult.data?.url) {
          throw new Error(uploadResult.error?.message || "Could not upload the book cover.");
        }
        image = uploadResult.data.url;
      }

      await apiRequestWithAuth("/books", {
        method: "POST",
        body: JSON.stringify({
          title: String(formData.get("title")).trim(),
          author: String(formData.get("author")).trim(),
          category: String(formData.get("category")),
          image,
          description: String(formData.get("description")).trim(),
          addedBy: {
            name: userName,
            email: userEmail,
          },
          totalCopies: Number(formData.get("totalCopies")),
          createdAt: new Date().toISOString(),
        }),
      });

      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImageUrl("");

      setSuccess("Book added successfully!");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not add the book. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-[#deddd3] bg-white px-4 py-3 text-sm text-[#25251f] outline-none transition placeholder:text-[#a09f94] focus:border-[#718768] focus:ring-2 focus:ring-[#718768]/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ToastMessage message={error} variant="error" onClose={() => setError("")} />
      <ToastMessage message={success} onClose={() => setSuccess("")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Book Title
          <input
            name="title"
            type="text"
            required
            maxLength={160}
            placeholder="e.g. The Midnight Library"
            className={inputClassName}
          />
        </label>

        <label className="block text-sm font-semibold">
          Author Name
          <input
            name="author"
            type="text"
            required
            maxLength={120}
            placeholder="e.g. Matt Haig"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="block text-sm font-semibold">
        Category
        <select
          name="category"
          required
          defaultValue=""
          className={inputClassName}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold">
        Total Copies
        <input
          name="totalCopies"
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          required
          className={inputClassName}
        />
      </label>

      <label className="block text-sm font-semibold">
        Book Image
        <input
          ref={fileInputRef}
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files?.length) setImageUrl("");
          }}
          className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-[#eef1e9] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#40583a]`}
        />
        <span className="mt-1 block text-xs font-normal text-[#858579]">Upload a cover to imgbb, or paste a direct image URL below.</span>
      </label>

      <label className="block text-sm font-semibold">
        Or paste Book Image URL
        <input
          name="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(event) => {
            setImageUrl(event.target.value);
            if (event.target.value && fileInputRef.current) fileInputRef.current.value = "";
          }}
          placeholder="https://example.com/book-cover.jpg"
          className={inputClassName}
        />
      </label>

      {imageUrl && (
        <div className="flex items-center gap-3 rounded-2xl bg-[#f7f6f1] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Book cover preview" className="size-16 rounded-lg object-cover" />
          <p className="text-sm text-[#68695f]">Book cover preview</p>
        </div>
      )}

      <label className="block text-sm font-semibold">
        Short Description
        <textarea
          name="description"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          placeholder="What is this book about?"
          className={`${inputClassName} resize-y`}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Your Name
          <input
            type="text"
            value={userName}
            readOnly
            className={`${inputClassName} bg-[#f7f6f1]`}
          />
        </label>

        <label className="block text-sm font-semibold">
          Your Email
          <input
            type="email"
            value={userEmail}
            readOnly
            className={`${inputClassName} bg-[#f7f6f1]`}
          />
        </label>
      </div>

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
