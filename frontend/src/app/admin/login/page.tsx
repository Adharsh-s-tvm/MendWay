// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication simulation
    if (email && password) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-primary p-3 sm:p-4 rounded-xl shadow-lg">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
          Mend-Way Admin
        </h1>
        <p className="text-sm sm:text-base text-foreground-muted mt-2">
          Professional service management platform
        </p>
      </div>

      {/* Login Form */}
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-border-subtle">
        <CardHeader className="text-center space-y-2 pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
            Admin Login
          </CardTitle>
          <CardDescription className="text-foreground-muted text-sm sm:text-base">
            Access your admin dashboard securely
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground font-medium text-sm sm:text-base"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@servicepro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 sm:h-11 border-border-subtle bg-surface focus:border-primary text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground font-medium text-sm sm:text-base"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 sm:h-11 border-border-subtle bg-surface focus:border-primary text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-border-subtle"
                />
                <Label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-foreground-muted cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <button
                type="button"
                className="text-xs sm:text-sm text-primary hover:text-primary-light transition-colors text-left sm:text-right"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="admin"
              size="lg"
              className="w-full h-10 sm:h-12 text-sm sm:text-base"
            >
              Login to Dashboard
            </Button>

            <p className="text-center text-xs sm:text-sm text-foreground-subtle">
              🔒 Admin access only
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-foreground-subtle">
        <p>Mend-Way Admin Portal © 2024</p>
      </div>
    </div>
  );
}
