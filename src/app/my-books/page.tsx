import { requireUser } from "@/lib/require-user";
import AccountPageFrame from "@/components/ui/AccountPageFrame";

export default async function MyBooksPage() {
  const user = await requireUser("/my-books");
  return <AccountPageFrame eyebrow="Your BookNook shelf" title="My books" description="Keep the books you have shared with the community close at hand." userName={user.name} />;
}
