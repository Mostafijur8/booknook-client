import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireUser(returnTo: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }

  return session.user;
}
