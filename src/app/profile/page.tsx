import { requireUser } from "@/lib/require-user";
import AccountPageFrame from "@/components/ui/AccountPageFrame";

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  return <AccountPageFrame eyebrow="Your reader account" title="My profile" description="Your BookNook account brings your shared books and borrowed reads together." userName={user.name} />;
}
