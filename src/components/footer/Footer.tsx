"use client";

import Link from "next/link";
import { BookOpen, Camera, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e6dd] bg-[#f1f0e9] text-[#25251f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr] lg:px-10 lg:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="BookNook home">
            <span className="grid size-10 place-items-center rounded-2xl bg-[#526b4b] text-white">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              Book<span className="text-[#718768]">Nook</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#68695f]">
            A cozy corner for readers to discover books, share stories, and pass a good read along.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-full border border-[#d8d7cd] text-[#526b4b] transition duration-200 hover:scale-110 hover:border-[#526b4b] hover:bg-white hover:shadow-md"
            >
              <span className="text-base font-bold leading-none" aria-hidden="true">f</span>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-full border border-[#d8d7cd] text-[#526b4b] transition duration-200 hover:scale-110 hover:border-[#526b4b] hover:bg-white hover:shadow-md"
            >
              <Camera className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#68695f]">
            {[
              { href: "/", label: "Home" },
              { href: "/books", label: "All Books" },
              { href: "/add-book", label: "Share a Book" },
              { href: "/my-books", label: "My Books" },
              { href: "/my-borrows", label: "My Borrows" },
              { href: "/profile", label: "My Profile" },
            ].map(({ href, label }) => {
              return (
                <li key={href}>
                  <Link className="transition hover:text-[#40583a]" href={href}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#68695f]">
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-[#718768]" aria-hidden="true" />
              <a className="transition hover:text-[#40583a]" href="mailto:hello@booknook.com">
                hello@booknook.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-[#718768]" aria-hidden="true" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e1dfd5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-[#858579] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} BookNook. All rights reserved.</p>
          <p>Made for people who love a good story.</p>
        </div>
      </div>
    </footer>
  );
}
