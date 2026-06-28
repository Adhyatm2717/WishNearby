import { Suspense } from "react";
import HomePageContent from "./home-content";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-8 space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-40 rounded-3xl bg-muted animate-pulse" />)}</div>}>
      <HomePageContent />
    </Suspense>
  );
}
