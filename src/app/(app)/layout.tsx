"use client";

import { SidebarNav, MobileNav } from "@/components/layout/navigation";
import { MiniMapPanel } from "@/components/map/mini-map-panel";
import { OnboardingGuard } from "@/components/experience/onboarding-guard";
import { useExperience } from "@/contexts/experience-context";
import { AddNeedModal } from "@/components/needs/add-need-modal";

function AppShell({ children }: { children: React.ReactNode }) {
  const { mode } = useExperience();
  const showMiniMap = mode === "explorer";

  return (
    <div className="flex min-h-dvh bg-background overflow-x-hidden pt-safe">
      <SidebarNav />
      <main className="flex-1 flex flex-col min-h-dvh min-w-0 pb-nav md:pb-0">
        <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
          <div className="flex-1 min-w-0 w-full">{children}</div>
          {showMiniMap && (
            <aside className="hidden xl:block w-80 2xl:w-96 p-4 xl:p-6 sticky top-0 h-dvh border-l border-border bg-card/50 shrink-0">
              <MiniMapPanel />
            </aside>
          )}
        </div>
      </main>
      <MobileNav />
      <AddNeedModal />
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingGuard>
      <AppShell>{children}</AppShell>
    </OnboardingGuard>
  );
}
