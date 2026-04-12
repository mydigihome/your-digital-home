import { useState } from "react";
import { X } from "lucide-react";

export default function PostDetailModal({ post, onClose }: { post: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-card rounded-xl border border-border p-6 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{post?.title || "Post Detail"}</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        {post?.caption && <p className="text-sm text-foreground mb-3">{post.caption}</p>}
        <div className="flex gap-2 mt-4">
          <span className="px-2 py-1 bg-muted rounded text-xs">{post?.platform}</span>
          <span className="px-2 py-1 bg-muted rounded text-xs">{post?.status}</span>
        </div>
      </div>
    </div>
  );
}
