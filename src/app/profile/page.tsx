import { requireUser } from "@/lib/require-user";
import AccountPageFrame from "@/components/ui/AccountPageFrame";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default async function ProfilePage() {
  const user = await requireUser("/profile");
  return <AccountPageFrame eyebrow="Your reader account" title="My profile" description="Your BookNook account brings your shared books and borrowed reads together." userName={user.name} />;
}
