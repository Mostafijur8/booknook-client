import { requireUser } from "@/lib/require-user";
import AccountPageFrame from "@/components/ui/AccountPageFrame";

export default async function AddBookPage() {
  const user = await requireUser("/add-book");
  return <AccountPageFrame eyebrow="Grow the community shelf" title="Share a book" description="Pass a favorite story along and help another reader find their next great read." userName={user.name} />;
}
