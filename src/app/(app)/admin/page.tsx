"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Shield,
  BarChart3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MOCK_NEEDS, MOCK_USERS } from "@/lib/data/mock-data";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminPage() {
  const [stats, setStats] = useState({ needs: 0, users: 0, reports: 0, verified: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground">Manage users, moderate content, view analytics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.users, icon: Users, color: "#2563EB" },
          { label: "Active Needs", value: stats.needs, icon: FileText, color: "#10B981" },
          { label: "Reports", value: stats.reports, icon: AlertTriangle, color: "#F59E0B" },
          { label: "Verified Businesses", value: stats.verified, icon: CheckCircle2, color: "#8B5CF6" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5">
              <stat.icon className="h-5 w-5 mb-3" style={{ color: stat.color }} />
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="needs">
        <TabsList>
          <TabsTrigger value="needs">Moderate Needs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="needs" className="space-y-3 mt-4">
          {MOCK_NEEDS.slice(0, 5).map((need) => (
            <Card key={need.id} className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold truncate">{need.title}</p>
                <p className="text-xs text-muted-foreground">{need.location_name} · {need.support_count} supporters</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Badge variant={need.status === "active" ? "success" : "outline"}>{need.status}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast.success("Need removed")}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="users" className="space-y-3 mt-4">
          {MOCK_USERS.map((user) => (
            <Card key={user.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{user.full_name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex gap-2">
                {user.is_admin && <Badge>Admin</Badge>}
                {user.is_entrepreneur && <Badge variant="success">Entrepreneur</Badge>}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card className="p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Connect Supabase to enable real-time analytics including need growth trends,
              geographic heatmaps, and business fulfillment rates.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
