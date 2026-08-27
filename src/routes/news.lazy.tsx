import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { useGoBack } from "@/hooks/use-go-back";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bell,
  Home as HomeIcon,
  Building,
  HandHeart,
  User,
  Plus,
  Pin,
  Share2,
  Bookmark,
  MoreVertical,
  X,
  ChevronLeft,
  Megaphone,
  Calendar,
  GraduationCap,
  Award,
  AlertTriangle,
  BookOpen,
  Flower2,
  Newspaper,
  Loader2,
} from "lucide-react";
import { PhoneFrame, SheetPortal } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useProfileRole } from "@/hooks/use-profile-role";
import { supabase } from "@/integrations/supabase/client";
import { friendlyAuthError } from "@/lib/auth-helpers";

export const Route = createLazyFileRoute("/news")({
  component: NewsPage,
});

type Category =
  | "Announcement"
  | "Event"
  | "Education"
  | "Scholarship"
  | "Achievement"
  | "Obituary"
  | "Emergency Notice"
  | "General Update";

type Post = {
  id: string;
  // Null once the author deletes their account: the notice stays, the byline goes.
  author_id: string | null;
  title: string;
  content: string;
  category: string;
  pinned: boolean;
  created_at: string;
  author: { full_name: string | null; avatar_url: string | null; role: string } | null;
};

const CATEGORY_META: Record<Category, { icon: typeof Megaphone; color: string }> = {
  Announcement: { icon: Megaphone, color: "from-primary to-accent-saffron" },
  Event: { icon: Calendar, color: "from-success to-primary" },
  Education: { icon: BookOpen, color: "from-primary to-success" },
  Scholarship: { icon: GraduationCap, color: "from-accent-saffron to-warning" },
  Achievement: { icon: Award, color: "from-warning to-accent-saffron" },
  Obituary: { icon: Flower2, color: "from-muted-foreground to-foreground" },
  "Emergency Notice": { icon: AlertTriangle, color: "from-destructive to-accent-saffron" },
  "General Update": { icon: Newspaper, color: "from-secondary-foreground to-muted-foreground" },
};

const FALLBACK_META = { icon: Newspaper, color: "from-secondary-foreground to-muted-foreground" };

function categoryMeta(category: string) {
  return CATEGORY_META[category as Category] ?? FALLBACK_META;
}

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
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initialOf(name: string | null) {
  return (name?.trim()?.[0] ?? "?").toUpperCase();
}

/** Posts fetched per page as the feed is scrolled. */
const PAGE_SIZE = 15;

/**
 * Mirrors the server ordering (pinned first, then newest first) so local
 * edits can be re-sorted without refetching the whole feed.
 */
function sortFeed(rows: Post[]) {
  return [...rows].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned) || b.created_at.localeCompare(a.created_at),
  );
}

const POST_SELECT =
  "id, author_id, title, content, category, pinned, created_at, author:profiles!posts_author_id_fkey(full_name, avatar_url, role)";

function NewsPage() {
  const navigate = useNavigate();
  const goBack = useGoBack();
  const { checking, session } = useRequireAuth();
  const { canPublish, isAdmin } = useProfileRole(session);
  const [posts, setPosts] = useState<Post[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /** Pinned posts first, then newest first within each group. */
  const fetchPage = useCallback(
    async (offset: number) => {
      if (!session) return { rows: [] as Post[], done: true };
      const { data, error: pageError } = await supabase
        .from("posts")
        .select(POST_SELECT)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);
      if (pageError) {
        setError(friendlyAuthError(pageError.message));
        return { rows: [] as Post[], done: true };
      }
      const rows = (data ?? []) as Post[];
      return { rows, done: rows.length < PAGE_SIZE };
    },
    [session],
  );

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      const [first, bookmarks] = await Promise.all([
        fetchPage(0),
        supabase.from("saved_posts").select("post_id").eq("user_id", session.user.id),
      ]);
      if (cancelled) return;
      setPosts(first.rows);
      setHasMore(!first.done);
      if (bookmarks.data) setSaved(new Set(bookmarks.data.map((b) => b.post_id)));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session, fetchPage]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const { rows, done } = await fetchPage(posts.length);
    // Guard against a post being inserted mid-scroll and shifting the window.
    setPosts((prev) => {
      const seen = new Set(prev.map((p) => p.id));
      return [...prev, ...rows.filter((r) => !seen.has(r.id))];
    });
    setHasMore(!done);
    setLoadingMore(false);
  }, [fetchPage, hasMore, loadingMore, posts.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root || loading || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { root, rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loading, hasMore]);

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
    const { error: pinError } = await supabase
      .from("posts")
      .update({ pinned: !pinned })
      .eq("id", id);
    if (pinError) {
      setError(friendlyAuthError(pinError.message));
      return;
    }
    // Re-sort locally rather than refetching; a newly pinned post moves to the top.
    setPosts((prev) => sortFeed(prev.map((p) => (p.id === id ? { ...p, pinned: !pinned } : p))));
  };

  const deletePost = async (id: string) => {
    const { error: deleteError } = await supabase.from("posts").delete().eq("id", id);
    if (deleteError) {
      setError(friendlyAuthError(deleteError.message));
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const addPost = async (input: {
    title: string;
    content: string;
    category: Category;
    pinned: boolean;
  }) => {
    if (!session) return;
    const { data, error: insertError } = await supabase
      .from("posts")
      .insert({
        author_id: session.user.id,
        title: input.title,
        content: input.content,
        category: input.category,
        pinned: input.pinned,
      })
      .select(POST_SELECT)
      .single();
    if (insertError) {
      setError(friendlyAuthError(insertError.message));
      return;
    }
    setShowCreate(false);
    // Sort rather than prepend: an unpinned post belongs below any pinned ones.
    if (data) setPosts((prev) => sortFeed([data as Post, ...prev]));
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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
                onClick={goBack}
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
          </div>
        </div>

        {/* Feed — newest first, paged in as it is scrolled */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto pb-28"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="px-5 pt-4 space-y-4">
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            {posts.length === 0 && (
              <div className="text-center py-16 px-6">
                <div className="text-4xl mb-3">📰</div>
                <p className="font-semibold text-foreground">No announcements yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Community news will appear here once the committee posts.
                </p>
              </div>
            )}
            {posts.map((p) => (
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

            {/* Tripwire for the next page */}
            <div ref={sentinelRef} />

            {loadingMore && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <div className="text-center text-xs text-muted-foreground py-6">
                You're all caught up ✨
              </div>
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

        <BottomNav active="home" />

        {showCreate && (
          <CreatePostSheet
            onClose={() => setShowCreate(false)}
            onSubmit={addPost}
            canPin={isAdmin}
          />
        )}
      </div>
    </PhoneFrame>
  );
}

function PostCard({
  post,
  saved,
  onSave,
  onShare,
  onPin,
  onDelete,
  canPin,
  canDelete,
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
  const authorName = post.author?.full_name ?? "Former member";
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
        <div
          className={`w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br ${meta.color} flex items-center justify-center text-white font-bold shadow-soft shrink-0`}
        >
          {post.author?.avatar_url ? (
            <img src={post.author.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            initialOf(post.author?.full_name ?? null)
          )}
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
                    onClick={() => {
                      onPin();
                      setMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-muted flex items-center gap-2"
                  >
                    <Pin className="w-4 h-4" /> {post.pinned ? "Unpin" : "Pin"}
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => {
                      onDelete();
                      setMenu(false);
                    }}
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
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold text-white bg-gradient-to-r ${meta.color}`}
        >
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
  onClose,
  onSubmit,
  canPin,
}: {
  onClose: () => void;
  onSubmit: (p: {
    title: string;
    content: string;
    category: Category;
    pinned: boolean;
  }) => Promise<void>;
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
    <SheetPortal>
      <div className="fixed md:absolute inset-0 z-40 bg-foreground/40 backdrop-blur-sm flex items-end md:items-center justify-center">
        <div className="w-full md:max-w-md bg-card rounded-t-3xl md:rounded-3xl shadow-elevated max-h-[90%] flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground">Create Post</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                placeholder="Add a clear, descriptive title"
                autoComplete="off"
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
              <div className="text-[10px] text-muted-foreground text-right mt-1">
                {content.length}/1500
              </div>
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

            <label
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted ${canPin ? "" : "hidden"}`}
            >
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
              {publishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </div>
      </div>
    </SheetPortal>
  );
}
