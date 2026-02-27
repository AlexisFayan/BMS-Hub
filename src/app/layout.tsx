import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import { AppShell } from "@/components/app-shell";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMS Hub — Plateforme Formation Bare Metal Server",
  description: "Formation, documentation et assistant IA pour maîtriser les BMS chez Orange Business Cloud Avenue.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
