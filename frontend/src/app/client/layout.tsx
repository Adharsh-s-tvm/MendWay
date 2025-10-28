"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute allowedRoles={["CLIENT"]}>{children}</ProtectedRoute>;
}
