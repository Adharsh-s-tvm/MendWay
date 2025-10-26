"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function ClientRootLayout({children}: {children: React.ReactNode}) {
    const {fetchUser, loading, isAuthenticated} = useAuthStore();

    useEffect(()=>{
        fetchUser();
    },[fetchUser]);

    if(loading) {
        return <p>Loading...</p>;
    }

    if(!isAuthenticated) {
        redirect("/login");
        return null;
    }

    return <>{children}</>
}