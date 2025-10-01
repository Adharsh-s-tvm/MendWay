"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/enhanced-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  CreditCard,
  MessageSquare,
  Wallet,
  User,
  Menu,
  LogOut,
  Shield, 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Workers", href: "/workers", icon: UserCheck },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Complaints", href: "/complaints", icon: MessageSquare },
  { name: "Verification", href: "/verification", icon: Shield },
  { name: "Wallet", href: "/wallet", icon: Wallet },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/login");
  };

  const isActivePath = (path: string) => pathname === path;

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-nav-hover">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-lg shrink-0">
            <Shield className="h-6 w-6 text-white" />
          </div>
          {(sidebarOpen || isMobile) && (
            <div className="min-w-0">
              <h1 className="font-bold text-white text-lg truncate">ServicePro</h1>
              <p className="text-xs text-nav-foreground truncate">Admin Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = isActivePath(item.href);
          return (
            <Button
              key={item.name}
              variant={isActive ? "nav-active" : "nav"}
              size="nav"
              onClick={() => {
                router.push(item.href);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "group transition-all duration-200 w-full justify-start",
                !sidebarOpen && !isMobile && "px-2 justify-center"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors shrink-0",
                  isActive
                    ? "text-white"
                    : "text-nav-foreground group-hover:text-white"
                )}
              />
              {(sidebarOpen || isMobile) && (
                <span className="ml-3 font-medium truncate">{item.name}</span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-nav-hover">
        <div
          className={cn(
            "flex items-center space-x-3",
            !sidebarOpen && !isMobile && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          {(sidebarOpen || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-nav-foreground truncate">
                admin@servicepro.com
              </p>
            </div>
          )}
        </div>
        {(sidebarOpen || isMobile) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full mt-3 text-nav-foreground hover:text-white hover:bg-nav-hover"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-border-subtle px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-sm">ServicePro</h1>
            <p className="text-xs text-foreground-muted">Admin</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-white text-xs font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 bg-nav-background border-nav-hover w-72"
            >
              <div className="flex flex-col h-full">
                <SidebarContent isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex bg-nav-background text-nav-foreground transition-all duration-300 flex-col",
            sidebarOpen ? "w-64" : "w-16"
          )}
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop Header */}
          <header className="hidden lg:flex bg-white border-b border-border-subtle px-4 xl:px-6 py-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-foreground hover:bg-surface"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="text-xl font-semibold text-foreground capitalize">
                  {pathname?.replace("/", "") || "dashboard"}
                </h1>
                <p className="text-sm text-foreground-muted hidden xl:block">
                  Manage your service booking platform
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-border-subtle hidden xl:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Avatar className="h-8 w-8 xl:hidden">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6 bg-surface overflow-hidden">
            <div className="h-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
