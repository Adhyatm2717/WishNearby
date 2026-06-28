"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { ExperienceProvider } from "@/contexts/experience-context";
import { AuthProvider } from "@/contexts/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <ExperienceProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "rounded-2xl shadow-soft-lg border border-border",
              },
            }}
          />
        </ExperienceProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}
