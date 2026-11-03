"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    eyebrow: "A little corner for every reader",
    title: "Good books find good people.",
    text: "Discover a story that stays with you, shared by readers just like you.",
    background: "from-[#263b30] via-[#526b4b] to-[#718768]",
    accent: "text-[#dbe5cf]",
  },
  {
    eyebrow: "Your next chapter starts here",
    title: "Find a new world between the pages.",
    text: "Browse a growing shelf of books and meet your next favorite read.",
    background: "from-[#704431] via-[#a86145] to-[#c78663]",
    accent: "text-[#f8d9c5]",
  },
  {
    eyebrow: "Read it. Love it. Pass it on.",
    title: "A good story is even better shared.",
    text: "Borrow from your community or send a well-loved book on its way.",
    background: "from-[#514525] via-[#8e7947] to-[#c4a95f]",
    accent: "text-[#f4e7b8]",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-10 lg:pt-8" aria-label="Featured books">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
        pagination={{ clickable: true }}
        loop
        className="booknook-hero-swiper overflow-hidden rounded-[2rem]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className={`relative min-h-[480px] overflow-hidden bg-gradient-to-br ${slide.background} px-7 py-14 text-white sm:px-12 md:min-h-[540px] md:px-16 lg:px-20`}>
              <div className="pointer-events-none absolute -right-14 -top-24 size-[26rem] rounded-full border border-white/10" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-2 -top-12 size-[21rem] rounded-full border border-white/10" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-36 right-[8%] size-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
              <div className="relative z-10 flex min-h-[380px] max-w-2xl flex-col justify-center animate-fade-up md:min-h-[440px]">
                <p className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium ${slide.accent}`}>
                  {index === 0 ? <Sparkles className="size-4" aria-hidden="true" /> : <BookOpen className="size-4" aria-hidden="true" />}
                  {slide.eyebrow}
                </p>
                <h1 className="max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  {slide.text}
                </p>
                <Link href="/books" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#263b30] transition hover:-translate-y-0.5 hover:shadow-lg">
                  Browse Books <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="animate-float pointer-events-none absolute bottom-10 right-[9%] hidden h-64 w-48 rotate-[8deg] rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm md:flex md:flex-col md:justify-between" aria-hidden="true">
                <BookOpen className="size-7 text-white/80" />
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-white/70" />
                  <div className="h-2 w-full rounded-full bg-white/35" />
                  <div className="h-2 w-2/3 rounded-full bg-white/35" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
