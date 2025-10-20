"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) router.replace("/login");
      else if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
        router.replace("/unauthorized");
      }
    }
  }, [isAuthenticated, loading, router, user, allowedRoles]);

  if (loading) return <div>Loading...</div>;

  return <>{isAuthenticated ? children : null}</>;
}
