"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Sidebar, MobileSidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPage = pathname === "/" || pathname === "/login";

  useEffect(() => {
    if (!loading && !user && !isPublicPage) {
      router.push("/login");
    }
  }, [user, loading, isPublicPage, router]);

  if (isPublicPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-6 lg:hidden">
          <MobileSidebar />
          <span className="text-sm font-semibold">BMS Hub</span>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
