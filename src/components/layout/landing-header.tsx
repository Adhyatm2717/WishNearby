"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#how-it-works", label: "How it works", external: true },
  { href: "#stats", label: "Impact", external: true },
  { href: "/entrepreneur", label: "For Entrepreneurs", external: false },
];

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 safe-area-top safe-area-x">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-2xl border border-border/50 px-4 sm:px-6 min-h-14 sm:min-h-[3.75rem] flex items-center justify-between gap-3 shadow-float"
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 min-w-0 cursor-pointer shrink-0 group"
              onClick={() => setMenuOpen(false)}
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-soft group-hover:shadow-soft-lg transition-shadow duration-200">
                <TrendingUp className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base sm:text-lg font-bold truncate tracking-tight">{APP_NAME}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ThemeToggle />
              <Button variant="ghost" asChild className="hidden sm:inline-flex text-muted-foreground">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button variant="primary" asChild size="sm" className="sm:h-10 sm:px-5 rounded-xl">
                <Link href="/home">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 shrink-0"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/10 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(4.5rem+env(safe-area-inset-top))] left-4 right-4 glass-strong rounded-2xl border border-border/50 p-3 shadow-float safe-area-x"
            >
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <hr className="border-border/60 my-2" />
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/60 transition-colors sm:hidden"
                >
                  Sign in
                </Link>
                <Button asChild className="mt-1 sm:hidden">
                  <Link href="/home" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
