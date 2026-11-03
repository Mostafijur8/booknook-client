"use client";

import { useRef } from "react";
import { imageInputClassName, inputClassName } from "@/components/forms/form-styles";

type BookCoverFieldProps = {
  imageUrl: string;
  onImageUrlChange: (value: string) => void;
};

export default function BookCoverField({ imageUrl, onImageUrlChange }: BookCoverFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label className="block text-sm font-semibold">
        Book Image
        <input
          ref={fileInputRef}
          name="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files?.length) onImageUrlChange("");
          }}
          className={imageInputClassName}
        />
        <span className="mt-1 block text-xs font-normal text-[#858579]">The cover is compressed in your browser before it is saved. You can also paste a direct image URL below.</span>
      </label>

      <label className="block text-sm font-semibold">
        Or paste Book Image URL
        <input
          name="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(event) => {
            onImageUrlChange(event.target.value);
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
    </>
  );
}
