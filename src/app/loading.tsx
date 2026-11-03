import Loading from "@/components/ui/Loading";

export default function AppLoading() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-[#faf8f3] px-5 text-[#25251f]">
      <Loading label="Opening the BookNook shelf…" />
    </main>
  );
}
