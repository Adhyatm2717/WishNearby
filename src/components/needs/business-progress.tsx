import { BUSINESS_STAGES } from "@/lib/constants";
import type { BusinessStage } from "@/types";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessProgressProps {
  stage: BusinessStage;
}

export function BusinessProgress({ stage }: BusinessProgressProps) {
  const progress = (stage / 4) * 100;

  return (
    <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft">
      <h3 className="font-bold text-lg mb-1">Business Progress</h3>
      <p className="text-sm text-muted-foreground mb-6">
        An entrepreneur is working on fulfilling this need
      </p>

      <Progress value={progress} className="mb-6 h-2" indicatorClassName="bg-secondary" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BUSINESS_STAGES.map((s) => {
          const isComplete = s.stage <= stage;
          const isCurrent = s.stage === stage;
          return (
            <div
              key={s.stage}
              className={cn(
                "p-3 rounded-2xl text-center transition-all",
                isCurrent && "bg-secondary/10 ring-2 ring-secondary/30",
                isComplete && !isCurrent && "opacity-70"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className={cn("h-6 w-6 mx-auto mb-2", isCurrent ? "text-secondary" : "text-muted-foreground")} />
              ) : (
                <Circle className="h-6 w-6 mx-auto mb-2 text-muted-foreground/40" />
              )}
              <p className={cn("text-xs font-bold", isCurrent && "text-secondary")}>
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
