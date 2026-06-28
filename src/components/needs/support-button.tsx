"use client";

import { useState } from "react";
import { Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SupportButtonProps {
  needId: string;
  initialSupported?: boolean;
  initialCount?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SupportButton({
  needId,
  initialSupported = false,
  initialCount,
  size = "default",
  className,
}: SupportButtonProps) {
  const [supported, setSupported] = useState(initialSupported);
  const [count, setCount] = useState(initialCount ?? 0);

  const handleSupport = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newSupported = !supported;
    setSupported(newSupported);
    setCount((c) => (newSupported ? c + 1 : Math.max(0, c - 1)));

    toast.success(newSupported ? "You're counted in!" : "Support removed");

    try {
      await fetch(`/api/needs/${needId}/vote`, {
        method: newSupported ? "POST" : "DELETE",
      });
    } catch {
      setSupported(!newSupported);
      setCount((c) => (newSupported ? Math.max(0, c - 1) : c + 1));
    }
  };

  return (
    <Button
      variant={supported ? "success" : "default"}
      size={size}
      onClick={handleSupport}
      className={cn("gap-2 ripple-effect relative overflow-hidden", className)}
    >
      {supported ? <Check className="h-4 w-4" /> : <Users className="h-4 w-4" />}
      {supported ? "Counted In" : "Count Me In"}
      {count > 0 && size !== "sm" && (
        <span className="ml-1 opacity-80">({count})</span>
      )}
    </Button>
  );
}
