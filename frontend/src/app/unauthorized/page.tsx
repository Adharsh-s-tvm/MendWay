"use client";

import React, { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { redirect } from "next/navigation";

const UnauthorizedPage = () => {
  const { fetchUser, user } = useAuthStore();

  useEffect(() => {
    fetchUser();
    if(user) {
      if(user.role === "CLIENT") {
        redirect("/client/home")
      } else if(user.role === "WORKER") {
        redirect("/worker/home")
      } else if(user.role === "ADMIN") {
        redirect("/admin")
       } 
    }
  }, [fetchUser]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-zinc-950 font-sans p-4">
      <div className="w-full max-w-sm">
        {/* Card Container */}
        <div className="bg-black border border-zinc-800 rounded-xl shadow-2xl">
          {/* Adjusted padding for better responsiveness on small screens */}
          <div className="p-8 sm:p-10 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-full">
                {/* Slightly smaller icon on extra-small screens */}
                <ShieldAlert className="h-10 w-10 sm:h-12 sm:w-12 text-red-500" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
              Access Denied
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-md text-zinc-400 mb-8">
              You do not have the necessary permissions to view this page.
            </p>

            {/* Return Button */}
            <a
              href="/login"
              className="w-full inline-block py-2.5 px-4 font-semibold rounded-lg transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black bg-yellow-500 text-gray-900 hover:bg-yellow-500/90 focus:ring-yellow-500"
            >
              Return to Login Page
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
