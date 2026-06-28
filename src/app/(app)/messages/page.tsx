"use client";

import { useState } from "react";
import { Send, MessageSquare, Plus, Check, CheckCheck, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatItem {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

const MOCK_CHATS: ChatItem[] = [
  {
    id: "chat-1",
    name: "Priya Patel",
    avatarText: "PP",
    avatarBg: "bg-amber-500",
    lastMessage: "I registered interest in your laundry service need. Let's coordinate!",
    time: "4:32 PM",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "chat-2",
    name: "Lohegaon Samosa Fans",
    avatarText: "LS",
    avatarBg: "bg-blue-600",
    lastMessage: "Rahul: I found a chef from Indore who knows how to make them!",
    time: "2:15 PM",
    isOnline: false,
  },
  {
    id: "chat-3",
    name: "Amit Desai",
    avatarText: "AD",
    avatarBg: "bg-emerald-600",
    lastMessage: "Awesome, let's connect on this tomorrow morning.",
    time: "Yesterday",
    isOnline: true,
  },
  {
    id: "chat-4",
    name: "Community Help Desk",
    avatarText: "HD",
    avatarBg: "bg-navy",
    lastMessage: "Welcome to WishNearby! Ask us anything here.",
    time: "3 days ago",
  },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "chat-1": [
    { id: "m1", sender: "them", text: "Hey! I saw your request for a 24/7 laundry service in Viman Nagar.", time: "4:30 PM" },
    { id: "m2", sender: "me", text: "Hi Priya! Yes, working professionals really struggle with current shop timings here.", time: "4:31 PM" },
    { id: "m3", sender: "them", text: "I registered interest in your laundry service need. Let's coordinate!", time: "4:32 PM" },
  ],
  "chat-2": [
    { id: "mc1", sender: "them", text: "Does anyone know where to get authentic MP style samosas here?", time: "1:00 PM" },
    { id: "mc2", sender: "me", text: "Nothing in Lohegaon yet, that's why we posted it!", time: "1:30 PM" },
    { id: "mc3", sender: "them", text: "Rahul: I found a chef from Indore who knows how to make them!", time: "2:15 PM" },
  ],
  "chat-3": [
    { id: "ma1", sender: "them", text: "Hey, can you help vote for the kids coding bootcamp in Koregaon Park?", time: "Yesterday" },
    { id: "ma2", sender: "me", text: "Done! Counted myself in.", time: "Yesterday" },
    { id: "ma3", sender: "them", text: "Awesome, let's connect on this tomorrow morning.", time: "Yesterday" },
  ],
  "chat-4": [
    { id: "mh1", sender: "them", text: "Welcome to WishNearby! We are here to help you improve your neighborhood.", time: "3 days ago" },
  ],
};

export default function MessagesPage() {
  const [activeChatId, setActiveChatId] = useState("chat-1");
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  const activeChat = MOCK_CHATS.find((c) => c.id === activeChatId)!;
  const chatMessages = messages[activeChatId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg],
    }));
    setInputText("");

    // Simulate reply after 1.5 seconds
    setTimeout(() => {
      const replyMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        sender: "them",
        text: `Thanks for the update! Let's work together to make this happen.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), replyMsg],
      }));
    }, 1500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 pb-nav md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2.5">
          <MessageSquare className="h-7 w-7 text-primary" />
          Inbox & Messages
        </h1>
        <p className="text-sm text-muted-foreground">
          Discuss community needs directly with other neighbors and local entrepreneurs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[calc(100vh-16rem)] min-h-[500px]">
        {/* Chat List Sidebar (4 columns) */}
        <Card className="md:col-span-4 p-4 border border-border/60 bg-card rounded-2xl flex flex-col h-full shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold tracking-tight">Active Chats</span>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-hide">
            {MOCK_CHATS.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 border-0",
                    isActive 
                      ? "bg-primary/5 border border-primary/20 ring-1 ring-primary/10 shadow-soft" 
                      : "bg-transparent hover:bg-muted/50 border border-transparent"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-soft", chat.avatarBg)}>
                      {chat.avatarText}
                    </div>
                    {chat.isOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cta border-2 border-card" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center gap-1.5">
                      <p className="text-xs font-bold text-foreground truncate">{chat.name}</p>
                      <span className="text-[9px] text-muted-foreground shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5 leading-relaxed">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount && !isActive && (
                    <span className="h-4 min-w-4 rounded-full bg-cta text-cta-foreground text-[8px] font-bold flex items-center justify-center shrink-0">
                      {chat.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Active Chat Pane (8 columns) */}
        <Card className="md:col-span-8 border border-border/60 bg-card rounded-2xl flex flex-col h-full shadow-float overflow-hidden">
          {/* Active Chat Header */}
          <div className="p-4 border-b border-border/50 bg-muted/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-soft", activeChat.avatarBg)}>
                {activeChat.avatarText}
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{activeChat.name}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  {activeChat.isOnline ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-cta animate-ping" />
                      Active now
                    </>
                  ) : (
                    "Offline"
                  )}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold">
              <Sparkles className="h-2.5 w-2.5 text-primary" /> Verified Connection
            </span>
          </div>

          {/* Messages Log area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/5">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("max-w-[70%] space-y-1")}>
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-soft",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground border border-border/50 rounded-bl-sm"
                        )}
                      >
                        {msg.text}
                      </div>
                      <div className={cn("flex items-center gap-1 text-[8px] text-muted-foreground px-1", isMe ? "justify-end" : "justify-start")}>
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="h-2.5 w-2.5 text-primary" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Message Input Controls */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border/50 bg-muted/10 flex items-center gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChat.name}...`}
              className="flex-1 rounded-xl text-xs h-10 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
            <Button type="submit" size="icon" className="h-10 w-10 rounded-xl shadow-soft shrink-0" disabled={!inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
