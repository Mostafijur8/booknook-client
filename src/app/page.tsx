import Categories from "@/components/home/Categories";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReaderReviews";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#25251f]">
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <Categories />
      <ReaderReviews />
    </main>
  );
}
