"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, PenLine, Users, Store, Heart, Shield, BadgeCheck, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast.success("Subscribed to community updates!");
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand & Social Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block bg-white p-3 rounded-xl border border-white/5 shadow-md max-w-[130px] hover:shadow-lg transition-all duration-300">
              <img src="/logo-full.png?v=5" alt="WishNearby Logo" className="w-full h-auto object-contain" />
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs sm:text-sm max-w-sm">
              A transparent, non-profit community utility designed to validate real local demand. No algorithms. No hidden commissions. Just neighborhood voices.
            </p>
            {/* Social Icons with Micro-animations */}
            <div className="flex items-center gap-3 pt-1">
              {[
                {
                  name: "Twitter X",
                  href: "#",
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "#",
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.752.054 2.768.127 4.166 1.525 4.293 4.293.043.968.054 1.322.054 3.752v.21c0 2.43-.01 2.784-.054 3.752-.127 2.768-1.525 4.166-4.293 4.293-.968.043-1.322.054-3.752.054h-.21c-2.43 0-2.784-.01-3.752-.054-2.768-.127-4.166-1.525-4.293-4.293C2.011 15.341 2 14.987 2 12.553v-.21c0-2.43.01-2.784.054-3.752.127-2.768 1.525-4.166 4.293-4.293.968-.043 1.322-.054 3.752-.054h.21zM12 5.802a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM12 16.75a4.75 4.75 0 110-9.5 4.75 4.75 0 010 9.5zM18.006 5.675a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "#",
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  href: "#",
                  icon: (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  title={social.name}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li><Link href="/home" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Explore Needs</Link></li>
              <li><Link href="/post" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Post a Need</Link></li>
              <li><Link href="/entrepreneur" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">For Entrepreneurs</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Demand Map</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Community Guidelines</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-all duration-200 cursor-pointer block font-medium">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Stay Updated</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Get monthly updates on top local wishes and community growth milestones.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20"
              >
                ✓ Thanks for subscribing to WishNearby!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-md focus-within:ring-2 focus-within:ring-primary/45 focus-within:border-primary/50 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3.5 py-2 text-xs sm:text-sm bg-transparent border-0 text-white focus:ring-0 focus:outline-none placeholder:text-slate-500"
                />
                <Button type="submit" variant="primary" className="rounded-lg shadow-soft font-semibold text-xs shrink-0 px-4 py-2 bg-primary hover:bg-primary/95 text-white border-0">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} WishNearby. Powered by local voice, zero ads.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
            Made with <Heart className="h-4 w-4 text-emerald-500 fill-emerald-500 animate-pulse" /> for stronger neighborhoods
          </p>
        </div>
      </div>
    </footer>
  );
}
