import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookDetails from "@/components/books/BookDetails";
import { apiRequest } from "@/lib/api";
import { requireUser } from "@/lib/require-user";
import type { Book } from "@/types/book";

type BookPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const book = await apiRequest<Book>(`/books/${id}`, { cache: "no-store" });
    return { title: `BookNook | ${book.title}` };
  } catch {
    return { title: "BookNook | Book Details" };
  }
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { id } = await params;
  const user = await requireUser(`/books/${id}`);

  let book: Book;
  try {
    book = await apiRequest<Book>(`/books/${id}`, { cache: "no-store" });
  } catch {
    notFound();
  }

  return <BookDetails book={book} user={{ name: user.name, email: user.email }} />;
}
