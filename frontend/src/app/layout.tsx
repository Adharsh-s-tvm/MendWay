"use client";

import React, { useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </div>
  );
}
