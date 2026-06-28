"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  MapPin,
  Users,
  Target,
  Briefcase,
  MessageCircle,
  BarChart3,
  DollarSign,
  Shield,
  ArrowUpRight,
  Sparkle,
  Compass,
  Building,
  TrendingDown,
  Percent,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCategory, DEFAULT_LOCATION } from "@/lib/constants";
import { calculateBusinessPotential, formatDistance, formatNumber, cn } from "@/lib/utils";
import type { Need } from "@/types";
import { toast } from "sonner";

const MapView = dynamic(() => import("@/components/map/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-72 rounded-2xl bg-muted/50 animate-pulse" />,
});

function getPotentialLabel(score: number): { label: string; variant: "success" | "warning" | "default" } {
  if (score >= 70) return { label: "High Potential", variant: "success" };
  if (score >= 45) return { label: "Medium Potential", variant: "warning" };
  return { label: "Low Potential", variant: "default" };
}

export default function EntrepreneurPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculator states
  const [conversionRate, setConversionRate] = useState(3); // Default 3%
  const [avgTicketSize, setAvgTicketSize] = useState(150); // Default ₹150

  useEffect(() => {
    fetch(`/api/entrepreneur/opportunities?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}`)
      .then((r) => r.json())
      .then(setOpportunities)
      .finally(() => setLoading(false));
  }, []);

  const topOpportunities = useMemo(
    () =>
      [...opportunities]
        .map((n) => ({
          ...n,
          score: calculateBusinessPotential(n.support_count, n.growth_rate, n.distance_km ?? 5),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 20),
    [opportunities]
  );

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    opportunities.forEach((n) => {
      counts[n.category] = (counts[n.category] ?? 0) + n.support_count;
    });
    return Object.entries(counts)
      .map(([slug, total]) => ({
        category: getCategory(slug as Need["category"]),
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [opportunities]);

  const handleClaim = async (needId: string) => {
    const res = await fetch("/api/entrepreneur/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ need_id: needId }),
    });
    if (res.ok) {
      toast.success("Interest registered! Supporters will be notified when you launch.");
      if (user) {
        setOpportunities((prev) =>
          prev.map((n) => (n.id === needId ? { ...n, entrepreneur_id: user.id, business_stage: 1 } : n))
        );
      }
    } else {
      toast.error("Failed to register launch interest");
    }
  };

  const handleLaunch = async (needId: string) => {
    const res = await fetch("/api/entrepreneur/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ need_id: needId }),
    });
    if (res.ok) {
      toast.success("Congratulations! The business has been marked as officially launched.");
      setOpportunities((prev) => prev.filter((n) => n.id !== needId));
    } else {
      toast.error("Failed to launch business");
    }
  };

  // Calculations for interactive tool
  const currentTopNeed = topOpportunities[0];
  const estimates = useMemo(() => {
    if (!currentTopNeed) return { daily: 0, monthly: 0, revenue: 0 };
    const monthlyReach = currentTopNeed.support_count * 12; // estimated local demand multiplier
    const dailyReach = Math.round(monthlyReach / 30);
    
    const dailyCustomers = Math.max(1, Math.round(dailyReach * (conversionRate / 100)));
    const monthlyCustomers = dailyCustomers * 30;
    const monthlyRevenue = monthlyCustomers * avgTicketSize;
    
    return {
      daily: dailyCustomers,
      monthly: monthlyCustomers,
      revenue: monthlyRevenue,
    };
  }, [currentTopNeed, conversionRate, avgTicketSize]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 md:space-y-10 pb-nav md:pb-8">
      {/* Workspace Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-gradient-to-br from-navy via-navy/95 to-slate-900 border border-gold/20 p-6 sm:p-8 text-primary-foreground shadow-float relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs font-semibold">
              <Sparkle className="h-3.5 w-3.5 fill-current animate-pulse" />
              Entrepreneur Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Business Opportunity Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-xl">
              Discover real community gaps, estimate customer conversion bases, and explore hot business opportunities backed by local demand in {DEFAULT_LOCATION.name}.
            </p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-soft">
            <Briefcase className="h-7 w-7 text-gold" />
          </div>
        </div>
      </motion.div>

      {/* Explore Opportunities Search (No Create Need Button) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 border border-border/60 bg-card rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-soft">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-base tracking-tight flex items-center gap-1.5 justify-center md:justify-start">
              <Compass className="h-5 w-5 text-primary" />
              Explore Gaps & Opportunities
            </h3>
            <p className="text-xs text-muted-foreground">Search and browse existing demands to identify business openings.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Link href="/explore" className="flex-1 md:flex-none">
              <Button variant="primary" size="lg" className="w-full rounded-xl shadow-soft gap-1.5">
                <Search className="h-4.5 w-4.5" />
                Explore Opportunities
              </Button>
            </Link>
            <Link href="/map">
              <Button variant="outline" size="lg" className="rounded-xl">
                View Heatmap
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Top Level Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Demand Gaps", value: opportunities.length, change: "+12% this month", icon: Target, color: "text-primary" },
          { label: "Avg. Target Supporters", value: opportunities.length ? Math.round(opportunities.reduce((s, n) => s + n.support_count, 0) / opportunities.length) : 0, change: "High engagement", icon: Users, color: "text-cta" },
          { label: "High Potential Scores", value: topOpportunities.filter((n) => n.score >= 70).length, change: "Score > 70%", icon: TrendingUp, color: "text-gold" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-5 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300 rounded-2xl border border-border/60 relative overflow-hidden bg-card">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{stat.label}</span>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground pt-1">{formatNumber(stat.value)}</div>
                </div>
                <div className={cn("h-9 w-9 rounded-xl bg-muted/65 flex items-center justify-center shrink-0", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold mt-4 flex items-center gap-1">
                <Sparkle className="h-3 w-3 text-gold fill-gold" />
                {stat.change}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Top Gaps on Left, Live map / calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top Opportunities (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">Top Opportunity Gaps</h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-40 rounded-2xl bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {topOpportunities.map((need, i) => {
                  const category = getCategory(need.category);
                  const potential = getPotentialLabel(need.score);
                  return (
                    <motion.div
                      key={need.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="p-5 sm:p-6 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300 rounded-2xl border border-border/60 bg-card">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-[9px] font-bold py-0.5">{category.label}</Badge>
                              <Badge variant={potential.variant} className="text-[9px] font-bold py-0.5">{potential.label}</Badge>
                              <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/15">
                                Demand Score: {need.score}%
                              </span>
                              
                              {/* Claim / Launch Status Badges */}
                              {need.entrepreneur_id && (
                                <span className={cn(
                                  "text-[10px] font-bold px-2.5 py-0.5 rounded-full border",
                                  need.entrepreneur_id === user?.id
                                    ? "text-blue-500 bg-blue-50/50 border-blue-200/60 dark:bg-blue-950/20 dark:border-blue-800/40"
                                    : "text-blue-500 bg-blue-50/50 border-blue-200/60 dark:bg-blue-950/20 dark:border-blue-800/40"
                                )}>
                                  {need.entrepreneur_id === user?.id 
                                    ? "You are launching this! 🚀" 
                                    : "Someone is interested"}
                                </span>
                              )}
                            </div>
                            <Link href={`/needs/${need.id}`}>
                              <h3 className="font-bold text-base sm:text-lg hover:text-primary transition-colors tracking-tight leading-snug">
                                {need.title}
                              </h3>
                            </Link>
                          </div>
                          
                          <div className="text-left sm:text-right shrink-0">
                            <p className="text-xl font-black text-cta">{formatNumber(need.support_count)}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Supporters</p>
                          </div>
                        </div>

                        {/* Metric grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs font-semibold text-muted-foreground">
                          <div className="bg-muted/40 p-2 rounded-xl border border-border/40">
                            <p className="text-[9px] text-muted-foreground uppercase">Growth Rate</p>
                            <p className="text-xs font-bold text-foreground mt-0.5">+{need.growth_rate}%</p>
                          </div>
                          <div className="bg-muted/40 p-2 rounded-xl border border-border/40">
                            <p className="text-[9px] text-muted-foreground uppercase">Distance</p>
                            <p className="text-xs font-bold text-foreground mt-0.5">{need.distance_km !== undefined ? formatDistance(need.distance_km) : "—"}</p>
                          </div>
                          <div className="bg-muted/40 p-2 rounded-xl border border-border/40">
                            <p className="text-[9px] text-muted-foreground uppercase">Est. Customers</p>
                            <p className="text-xs font-bold text-foreground mt-0.5">{Math.round(need.support_count * 0.15)}/day</p>
                          </div>
                          <div className="bg-muted/40 p-2 rounded-xl border border-border/40">
                            <p className="text-[9px] text-muted-foreground uppercase">Confidence</p>
                            <p className="text-xs font-bold text-foreground mt-0.5">{Math.min(95, 50 + Math.round(need.support_count / 4))}%</p>
                          </div>
                        </div>

                        <Progress value={need.score} className="mb-4 h-2 rounded-full" />

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          {need.entrepreneur_id === user?.id ? (
                            <Button 
                              variant="primary" 
                              className="flex-1 rounded-xl text-xs font-bold py-2 shadow-soft bg-emerald-600 hover:bg-emerald-700 text-white border-none" 
                              onClick={() => handleLaunch(need.id)}
                            >
                              Have you started this? (Mark as Launched)
                            </Button>
                          ) : need.entrepreneur_id ? (
                            <Button 
                              variant="outline" 
                              className="flex-1 rounded-xl text-xs font-bold py-2 cursor-not-allowed opacity-60" 
                              disabled
                            >
                              Someone is launching this
                            </Button>
                          ) : (
                            <Button 
                              variant="success" 
                              className="flex-1 rounded-xl text-xs font-bold py-2 shadow-soft" 
                              onClick={() => handleClaim(need.id)}
                            >
                              Register Launch Interest
                            </Button>
                          )}
                          <Link href={`/needs/${need.id}`} className="flex-1">
                            <Button variant="secondary" className="w-full rounded-xl text-xs font-bold py-2 gap-1">
                              <MessageCircle className="h-4 w-4" /> Discussion
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Calculator, Heatmap & Categories (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Business Calculator */}
          {currentTopNeed && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gold" />
                <h2 className="text-lg font-bold tracking-tight">Business Potential Calculator</h2>
              </div>
              
              <Card className="p-5 border border-gold/20 bg-gradient-to-br from-gold/5 via-transparent to-transparent rounded-2xl shadow-soft space-y-5">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gold">Target Opportunity</h3>
                  <p className="text-xs font-bold text-foreground truncate mt-1 leading-snug">{currentTopNeed.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{currentTopNeed.support_count} supporters verified demand</p>
                </div>

                {/* Conversion Rate Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Est. Conversion Rate</span>
                    <span className="text-gold">{conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[9px] text-muted-foreground">
                    <span>Conservative (1%)</span>
                    <span>Aggressive (10%)</span>
                  </div>
                </div>

                {/* Avg Ticket Size Input */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Average Ticket Size</span>
                    <span className="text-gold">₹{avgTicketSize}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={avgTicketSize}
                    onChange={(e) => setAvgTicketSize(Number(e.target.value))}
                    className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[9px] text-muted-foreground">
                    <span>Low (₹10)</span>
                    <span>High (₹500)</span>
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40 text-center font-bold text-xs">
                  <div className="bg-card p-3 rounded-xl border border-border/50">
                    <p className="text-[9px] text-muted-foreground uppercase">Est. Monthly Customers</p>
                    <p className="text-lg font-black text-foreground mt-0.5">{formatNumber(estimates.monthly)}</p>
                  </div>
                  <div className="bg-card p-3 rounded-xl border border-gold/15">
                    <p className="text-[9px] text-gold uppercase">Est. Monthly Revenue</p>
                    <p className="text-lg font-black text-gold mt-0.5">₹{formatNumber(estimates.revenue)}</p>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Interactive Heatmap mini view */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold tracking-tight">Demand Heatmap</h2>
            </div>
            <Card className="overflow-hidden p-0 rounded-2xl border border-border/60 shadow-soft">
              <div className="h-56">
                <MapView
                  needs={opportunities}
                  center={[DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng]}
                  zoom={12}
                  height="100%"
                  showHeatmap
                  className="!rounded-none"
                />
              </div>
            </Card>
          </section>

          {/* Trending Categories progress bars */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold tracking-tight">Trending Categories</h2>
            </div>
            <Card className="p-5 border border-border/60 bg-card rounded-2xl shadow-soft space-y-4">
              {categoryStats.map((item, i) => {
                const max = categoryStats[0]?.total ?? 1;
                const pct = Math.round((item.total / max) * 100);
                const Icon = item.category.icon;
                return (
                  <div key={item.category.slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: item.category.color }} />
                        {item.category.label}
                      </span>
                      <span className="text-muted-foreground">{formatNumber(item.total)} votes</span>
                    </div>
                    <Progress value={pct} className="h-1.5 rounded-full" />
                  </div>
                );
              })}
            </Card>
          </section>

          {/* Custom vector Area Chart showing demand analytics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold tracking-tight">Demand Trend Insights</h2>
            </div>
            <Card className="p-5 border border-border/60 bg-card rounded-2xl shadow-soft">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Local Demand Velocity</span>
              <p className="text-xs font-bold text-foreground mt-1">Growth rate shows +34% hike over 30 days</p>
              
              {/* Premium Inline SVG Area Chart */}
              <svg viewBox="0 0 400 150" className="w-full h-28 mt-4 select-none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#1E3A8A" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(226, 232, 240, 0.4)" strokeDasharray="3 3" />
                
                <path
                  d="M0 130 C 60 110, 120 70, 180 85 C 240 100, 300 45, 360 40 C 380 38, 390 20, 400 15"
                  fill="none"
                  stroke="#1E3A8A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 130 C 60 110, 120 70, 180 85 C 240 100, 300 45, 360 40 C 380 38, 390 20, 400 15 L 400 150 L 0 150 Z"
                  fill="url(#chart-grad)"
                />
                <circle cx="180" cy="85" r="4" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="360" cy="40" r="4" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
