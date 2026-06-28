"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExperience } from "@/contexts/experience-context";

export default function PostRedirectPage() {
  const router = useRouter();
  const { setIsAddNeedOpen } = useExperience();

  useEffect(() => {
    setIsAddNeedOpen(true);
    router.replace("/home");
  }, [router, setIsAddNeedOpen]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh">
      <div className="text-center p-6 space-y-4">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground text-sm font-semibold tracking-tight">Opening Add Need...</p>
      </div>
    </div>
  );
}
