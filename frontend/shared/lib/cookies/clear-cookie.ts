"use server"
import { cookies } from "next/headers";

export async function clearCookie(name: string) {
  // Server
  if (typeof window === "undefined") {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    return;
  }

  // Client
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}