"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

/**
 * Fetches the currently authenticated Payload user (with depth=1 so
 * relationships like savedWorks are populated). Uses the bearer token
 * stored on the next-auth session.
 */
export function useCurrentUser() {
  const { data: session, status } = useSession();
  const token = (session?.user as any)?.token as string | undefined;

  return useQuery({
    queryKey: ["current-user", token ?? "anon"],
    enabled: status !== "loading",
    queryFn: async () => {
      const res = await api.users.me(token);
      return res?.user ?? res ?? null;
    },
  });
}
