const API_URL =
  typeof window !== "undefined" &&
  window.location.origin === "https://booknook-tawny.vercel.app"
    ? "https://booknook-server-dun.vercel.app"
    : process.env.NEXT_PUBLIC_API_URL ||
      (process.env.VERCEL
        ? "https://booknook-server-dun.vercel.app"
        : "http://localhost:5000");

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
