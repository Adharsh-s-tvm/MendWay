"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "./ui/spinner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({children, allowedRoles}: ProtectedRouteProps) => {
    const router = useRouter();
    const {user, isAuthenticated, loading, fetchUser} = useAuthStore();

    useEffect(() => {
            fetchUser();
    },[fetchUser]);

    useEffect(() => {
        if(!loading) {
            if(!isAuthenticated) {
                router.replace("/login");
            } else if(allowedRoles && !allowedRoles.includes(user?.role || "")) {
                router.replace("/unauthorized");
            }
        }
    }, [loading, isAuthenticated, user, allowedRoles, router])

    if(loading) {
        return <Spinner />
    }

    if( !isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
        return null;
    }
    return <>{children}</>
}

export default ProtectedRoute;