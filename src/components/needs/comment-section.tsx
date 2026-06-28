"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/types";
import { toast } from "sonner";

interface CommentSectionProps {
  needId: string;
  comments: Comment[];
}

export function CommentSection({ needId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/needs/${needId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const comment = await res.json();
      setComments([comment, ...comments]);
      setContent("");
      toast.success("Comment posted");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

      <div className="flex gap-3 mb-6">
        <Textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className="flex-1"
        />
        <Button
          size="icon"
          className="h-auto self-end rounded-xl"
          onClick={handleSubmit}
          disabled={submitting || !content.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-4 rounded-2xl bg-muted/50">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {comment.user?.full_name?.charAt(0) ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">
                  {comment.user?.full_name ?? "Anonymous"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
