"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

    if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6 text-yellow-500" />
      </div>
    )

  return <>{children}</>;
}