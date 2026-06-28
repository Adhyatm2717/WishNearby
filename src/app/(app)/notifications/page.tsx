"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  MessageCircle,
  Heart,
  Store,
  Newspaper,
  CheckCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

const typeIcons = {
  support: Heart,
  comment: MessageCircle,
  business_claim: Store,
  business_open: Store,
  weekly_update: Newspaper,
};

const typeColors = {
  support: "text-emerald-600 bg-emerald-500/10",
  comment: "text-primary bg-primary/10",
  business_claim: "text-amber-600 bg-amber-500/10",
  business_open: "text-emerald-600 bg-emerald-500/10",
  weekly_update: "text-purple-600 bg-purple-500/10",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then(setNotifications)
      .finally(() => setLoading(false));
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6"
      >
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead} className="shrink-0 self-start sm:self-auto">
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        )}
      </motion.div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="When someone supports your need or a business opens nearby, you'll see it here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notif, i) => {
            const Icon = typeIcons[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 cursor-default",
                  !notif.read
                    ? "bg-primary/5 border border-primary/15 shadow-soft"
                    : "bg-card border border-border/60 hover:shadow-soft"
                )}
              >
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", typeColors[notif.type])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
