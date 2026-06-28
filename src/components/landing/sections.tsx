"use client";

import { motion } from "framer-motion";
import { MapPin, PenLine, Users, Store, Heart, Shield, BadgeCheck, Lock } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: PenLine,
    title: "Post a Need",
    description: "Share what you wish existed in your neighborhood — food, services, anything.",
    color: "#6D28D9",
    gradient: "from-violet-500/10 to-purple-500/5",
  },
  {
    icon: Users,
    title: "Gather Support",
    description: 'Others nearby press "Count Me In" to show real demand. No payments, just voices.',
    color: "#16A34A",
    gradient: "from-emerald-500/10 to-green-500/5",
  },
  {
    icon: Store,
    title: "Entrepreneurs Discover",
    description: "Local business owners see validated demand and decide to fill the gap.",
    color: "#9333EA",
    gradient: "from-purple-500/10 to-violet-500/5",
  },
  {
    icon: Heart,
    title: "Community Wins",
    description: "Businesses open, needs get fulfilled, and local economies grow stronger.",
    color: "#7C3AED",
    gradient: "from-violet-500/10 to-fuchsia-500/5",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No marketplace. No commissions. Just pure community demand discovery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`group p-6 sm:p-7 rounded-2xl border border-border/60 bg-gradient-to-br ${step.gradient} bg-card hover:shadow-soft-lg transition-shadow duration-300 cursor-default`}
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-5 shadow-soft"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <step.icon className="h-6 w-6" style={{ color: step.color }} />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-muted/80 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Step {i + 1}
              </span>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustItems = [
  { icon: Shield, title: "Non-profit", desc: "No ads, no hidden fees, ever" },
  { icon: BadgeCheck, title: "Verified needs", desc: "AI checks for spam and duplicates" },
  { icon: Lock, title: "Privacy first", desc: "Your data stays in your community" },
];

export function TrustSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 border-y border-border/60 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Built on trust</h2>
          <p className="text-muted-foreground text-lg">A platform designed for communities, not profit</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/60 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "I posted about wanting MP-style samosas and got 186 supporters in weeks. A local chef is now planning to open a stall!",
      author: "Rahul S.",
      location: "Lohegaon, Pune",
      avatar: "RS",
    },
    {
      quote:
        "As an entrepreneur, WishNearby showed me exactly where demand exists. I opened a laundry service with confidence.",
      author: "Priya P.",
      location: "Koregaon Park, Pune",
      avatar: "PP",
    },
    {
      quote:
        "This isn't another app trying to sell you things. It's genuinely about making our neighborhood better.",
      author: "Amit D.",
      location: "Viman Nagar, Pune",
      avatar: "AD",
    },
  ];

  return (
    <section className="py-24 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by communities
          </h2>
          <p className="text-lg text-muted-foreground">Real stories from real people</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-2xl bg-card border border-border/60 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 flex flex-col"
            >
              <p className="text-foreground leading-relaxed mb-6 text-sm flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="h-10 w-10 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-soft">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-3 gradient-text">WishNearby</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md text-sm">
              A non-profit community platform revealing real local demand. No ads. No commissions.
              No marketplace. Community first.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Platform</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/home" className="hover:text-primary transition-colors duration-200 cursor-pointer">Explore Needs</Link></li>
              <li><Link href="/post" className="hover:text-primary transition-colors duration-200 cursor-pointer">Post a Need</Link></li>
              <li><Link href="/entrepreneur" className="hover:text-primary transition-colors duration-200 cursor-pointer">For Entrepreneurs</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors duration-200 cursor-pointer">Demand Map</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Community</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors duration-200 cursor-pointer">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 cursor-pointer">Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 cursor-pointer">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200 cursor-pointer">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WishNearby. Non-profit community platform.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-cta fill-cta" /> for local communities
          </p>
        </div>
      </div>
    </footer>
  );
}
