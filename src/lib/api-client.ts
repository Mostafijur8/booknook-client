"use client";

import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequestWithAuth<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`,
    { ...options, headers },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  const responseText = await response.text();
  if (!responseText) return undefined as T;
  try {
    return JSON.parse(responseText) as T;
  } catch {
    return responseText as T;
  }
}
