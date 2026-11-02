import { requireUser } from "@/lib/require-user";

type EditBookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  const user = await requireUser(`/my-books/edit/${id}`);

  return <main className="min-h-screen bg-[#faf8f3] px-6 py-12 text-[#25251f]">Edit book {id} for {user.name}</main>;
}
