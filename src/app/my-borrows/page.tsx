import { requireUser } from "@/lib/require-user";
import AccountPageFrame from "@/components/ui/AccountPageFrame";

export default async function MyBorrowsPage() {
  const user = await requireUser("/my-borrows");
  return <AccountPageFrame eyebrow="Your current reads" title="My borrows" description="Keep track of the stories you have borrowed and the books ready to return." userName={user.name} />;
}
