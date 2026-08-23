import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search, Bell, Home as HomeIcon, Building, HandHeart, User,
  Plus, Pin, Share2, Bookmark, MoreVertical, X,
  ChevronLeft, Filter, Megaphone, Calendar, GraduationCap, Award,
  AlertTriangle, BookOpen, Flower2, Newspaper, Loader2,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({ meta: [{ title: "Community News \u2014 Sangath" }] }),
});

type Category =
  | "Announcement" | "Event" | "Education" | "Scholarship"
  | "Achievement" | "Obituary" | "Emergency Notice" | "General Update";

type Post = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  created_at: string;
  author: { full_name: string | null; role: string } | null;
};

const CATEGORY_META: Record<Category, { icon: typeof Megaphone; color: string }> = {
  "Announcement": { icon: Megaphone, color: "from-primary to-accent-saffron" },
  "Event": { icon: Calendar, color: "from-success to-primary" },
  "Education": { icon: BookOpen, color: "from-primary to-success" },
  "Scholarship": { icon: GraduationCap, color: "from-accent-saffron to-warning" },
  "Achievement": { icon: Award, color: "from-warning to-accent-saffron" },
  "Obituary": { icon: Flower2, color: "from-muted-foreground to-foreground" },
  "Emergency Notice": { icon: AlertTriangle, color: "from-destructive to-accent-saffron" },
  "General Update": { icon: Newspaper, color: "from-secondary-foreground to-muted-foreground" },
};

const FALLBACK_META = { icon: Newspaper, color: "from-secondary-foreground to-muted-foreground" };

function categoryMeta(category: string) {
  return CATEGORY_META[category as Category] ?? FALLBACK_META;
}

const FILTERS = ["All", "Announcement", "Event", "Education", "Scholarship", "Achievement"] as const;

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrator",
  committee: "Committee Member",
  member: "Member",
};

/** "2 hours ago" style stamp; falls back to a date once it is over a week old. */
function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.floor((Date.now() - then) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function initialOf(name: string | null) {
  return (name?.trim()?.[0] ?? "?").toUpperCase();
}

function NewsPage() {
  const navigate = useNavigate();
  const { checking, session } = useRequireAuth();
  const { canPublish, isAdmin } = useProfileRole(session);
  const [posts, setPosts] = useState<Post[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    if (!session) return;
    const [feed, bookmarks] = await Promise.all([
      supabase
        .from("posts")
        .select("id, author_id, title, content, category, pinned, created_at, author:profiles!posts_author_id_fkey(full_name, role)")
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase.from("saved_posts").select("post_id").eq("user_id", session.user.id),
    ]);
    if (feed.error) setError(friendlyAuthError(feed.error.message));
    else {
      setPosts((feed.data ?? []) as Post[]);
      setError("");
    }
    if (bookmarks.data) setSaved(new Set(bookmarks.data.map((b) => b.post_id)));
    setLoading(false);
  }, [session]);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (filter === "All" ? true : p.category === filter))
      .filter((p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.author?.full_name ?? "").toLowerCase().includes(q),
      );
  }, [posts, query, filter]);

  const toggleSave = async (id: string) => {
    if (!session) return;
    const wasSaved = saved.has(id);
    setSaved((prev) => {
      const next = new Set(prev);
      if (wasSaved) next.delete(id);
      else next.add(id);
      return next;
    });
    const { error: saveError } = wasSaved
      ? await supabase.from("saved_posts").delete().eq("user_id", session.user.id).eq("post_id", id)
      : await supabase.from("saved_posts").insert({ user_id: session.user.id, post_id: id });
    if (saveError) {
      setSaved((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(id);
        else next.delete(id);
        return next;
      });
    }
  };

  const togglePin = async (id: string, pinned: boolean) => {
    const { error: pinError } = await supabase.from("posts").update({ pinned: !pinned }).eq("id", id);
    if (pinError) {
      setError(friendlyAuthError(pinError.message));
      return;
    }
    await load();
  };

  const deletePost = async (id: string) => {
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);
    if (deleteError) {
      setError(friendlyAuthError(deleteError.message));
      return;
    }
    await load();
  };

  const addPost = async (input: { title: string; content: string; category: Category; pinned: boolean }) => {
    if (!session) return;
    const { error: insertError } = await supabase.from("posts").insert({
      author_id: session.user.id,
      title: input.title,
      content: input.content,
      category: input.category,
      pinned: input.pinned,
    });
    if (insertError) {
      setError(friendlyAuthError(insertError.message));
      return;
    }
    setShowCreate(false);
    await load();
  };

  const sharePost = async (p: Post) => {
    const text = `${p.title}\n\n${p.content}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: p.title, text });
        return;
      } catch {
        // Share sheet dismissed - fall through to the clipboard copy.
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard blocked; nothing else to try.
      }
    }
  };

  if (checking || loading) return <LoadingScreen />;

  return (
    <PhoneFrame>
      <div className="relative flex flex-col h-full min-h-screen md:min-h-0 md:h-[860px] bg-background">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-8 pb-3">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => navigate({ to: "/home" })}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                aria-label="Back"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">Community</div>
                <div className="font-semibold text-foreground truncate">News & Announcements</div>
              </div>
              <button className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-2 h-12 px-4 bg-muted rounded-2xl shadow-soft">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search announcements, events, notices..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/70"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`shrink-0 px-3 h-8 rounded-full text-xs font-semibold border transition ${
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card text-muted-foreground border-border"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: "none" }}>
          <div className="px-5 pt-4 space-y-4">
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            {visible.length === 0 && (
              <div className="text-center py-16 px-6">
                <div className="text-4xl mb-3">📰</div>
                <p className="font-semibold text-foreground">
                  {posts.length === 0 ? "No announcements yet" : "No posts match your search"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {posts.length === 0
                    ? "Community news will appear here once the committee posts."
                    : "Try a different search or filter."}
                </p>
              </div>
            )}
            {visible.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                saved={saved.has(p.id)}
                onSave={() => void toggleSave(p.id)}
                onShare={() => void sharePost(p)}
                onPin={() => void togglePin(p.id, p.pinned)}
                onDelete={() => void deletePost(p.id)}
                canPin={isAdmin}
                canDelete={isAdmin || p.author_id === session?.user.id}
              />
            ))}
            {visible.length > 0 && (
              <div className="text-center text-xs text-muted-foreground py-6">You're all caught up ✨</div>
            )}
          </div>
        </div>

        {/* Create Post FAB */}
        {canPublish && (
          <button
            onClick={() => setShowCreate(true)}
            className="absolute right-5 bottom-24 z-30 h-14 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-elevated flex items-center gap-2 active:scale-95 transition"
          >
            <Plus className="w-5 h-5" /> Create Post
          </button>
        )}

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-xl border-t border-border px-3 pt-2 pb-4">
          <div className="flex items-center justify-around">
            {[
              { id: "home", icon: HomeIcon, label: "Home", to: "/home" as const },
              { id: "facilities", icon: Building, label: "Facilities", to: "/facilities" as const },
              { id: "fundraiser", icon: HandHeart, label: "Fundraiser", to: "/fundraiser" as const },
              { id: "profile", icon: User, label: "Profile", to: "/account" as const },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => navigate({ to: n.to })}
                className="flex flex-col items-center gap-1 py-1 px-4"
              >
                <n.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10.5px] font-medium text-muted-foreground">{n.label}</span>
              </button>
            ))}
          </div>
        </div>

        {showCreate && (
          <CreatePostSheet onClose={() => setShowCreate(false)} onSubmit={addPost} canPin={isAdmin} />
        )}
      </div>
    </PhoneFrame>
  );
}

function PostCard({
  post, saved, onSave, onShare, onPin, onDelete, canPin, canDelete,
}: {
  post: Post;
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onPin: () => void;
  onDelete: () => void;
  canPin: boolean;
  canDelete: boolean;
}) {
  const [menu, setMenu] = useState(false);
  const meta = categoryMeta(post.category);
  const Icon = meta.icon;
  const authorName = post.author?.full_name ?? "Unknown member";
  const authorRole = ROLE_LABEL[post.author?.role ?? "member"] ?? "Member";

  return (
    <article
      className={`relative rounded-2xl bg-card border shadow-card overflow-hidden ${
        post.pinned ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      }`}
    >
      {post.pinned && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-soft text-primary text-[11px] font-bold uppercase tracking-wider">
          <Pin className="w-3 h-3" /> Pinned Announcement
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-3.5 pb-2.5">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center text-white font-bold shadow-soft shrink-0`}>
          {initialOf(post.author?.full_name ?? null)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{authorName}</div>
          <div className="text-[11px] text-muted-foreground truncate">
            {authorRole} · {relativeTime(post.created_at)}
          </div>
        </div>
        {(canPin || canDelete) && (
          <div className="relative">
            <button
              onClick={() => setMenu((v) => !v)}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
              aria-label="Post options"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
            {menu && (
              <div className="absolute right-0 top-9 z-10 w-40 rounded-xl bg-popover border border-border shadow-elevated text-sm overflow-hidden">
                {canPin && (
                  <button
                    onClick={() => { onPin(); setMenu(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-muted flex items-center gap-2"
                  >
                    <Pin className="w-4 h-4" /> {post.pinned ? "Unpin" : "Pin"}
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => { onDelete(); setMenu(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-muted text-destructive flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category chip */}
      <div className="px-4 pb-2">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-white bg-gradient-to-r ${meta.color}`}>
          <Icon className="w-3 h-3" /> {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <h3 className="text-base font-bold text-foreground leading-snug">{post.title}</h3>
        <p className="mt-1.5 text-[13.5px] text-foreground/85 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-2 py-1.5 flex items-center">
        <button
          onClick={onShare}
          className="flex-1 h-10 rounded-xl text-sm font-semibold text-foreground hover:bg-muted flex items-center justify-center gap-2 transition"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          onClick={onSave}
          className={`flex-1 h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition ${
            saved ? "text-primary" : "text-foreground hover:bg-muted"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-primary" : ""}`} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}

function CreatePostSheet({
  onClose, onSubmit, canPin,
}: {
  onClose: () => void;
  onSubmit: (p: { title: string; content: string; category: Category; pinned: boolean }) => Promise<void>;
  canPin: boolean;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("Announcement");
  const [pinned, setPinned] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const canSubmit = title.trim().length > 2 && content.trim().length > 5 && !publishing;

  const publish = async () => {
    if (!canSubmit) return;
    setPublishing(true);
    await onSubmit({ title: title.trim(), content: content.trim(), category, pinned });
    setPublishing(false);
  };

  return (
    <div className="absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center">
      <div className="w-full md:max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-elevated max-h-[90%] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Create Post</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: "none" }}>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder="Add a clear, descriptive title"
              className="mt-1 w-full h-11 px-3 rounded-xl bg-muted border border-border outline-none text-sm focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Post Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1500}
              rows={5}
              placeholder="Write your announcement, notice or update..."
              className="mt-1 w-full px-3 py-2.5 rounded-xl bg-muted border border-border outline-none text-sm focus:ring-2 focus:ring-primary resize-none"
            />
            <div className="text-[10px] text-muted-foreground text-right mt-1">{content.length}/1500</div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Category</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(CATEGORY_META) as Category[]).map((c) => {
                const active = category === c;
                const Icon = CATEGORY_META[c].icon;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`h-10 px-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {c}
                  </button>
                );
              })}
            </div>
          </div>

          <label className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted ${canPin ? "" : "hidden"}`}>
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5" /> Featured Announcement
              </div>
              <div className="text-[11px] text-muted-foreground">Pin to top of the feed</div>
            </div>
          </label>
        </div>

        <div className="border-t border-border px-5 py-3 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-muted text-foreground text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            onClick={() => void publish()}
            className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {publishing ? (<><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>) : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
