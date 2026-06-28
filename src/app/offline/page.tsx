"use client";

import Link from "next/link";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You&apos;re offline</h1>
        <p className="text-muted-foreground mb-6">
          Check your connection and try again. Cached pages may still be available.
        </p>
        <Button asChild>
          <Link href="/home">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
