import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Bell, Home as HomeIcon, Building, HandHeart, User,
  Plus, Pin, Share2, Bookmark, MoreVertical, X, Image as ImageIcon,
  ChevronLeft, Filter, Megaphone, Calendar, GraduationCap, Award,
  AlertTriangle, BookOpen, Flower2, Newspaper,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useRequireAuth } from "@/hooks/use-require-auth";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({ meta: [{ title: "Community News — Sangath" }] }),
});

type Category =
  | "Announcement" | "Event" | "Education" | "Scholarship"
  | "Achievement" | "Obituary" | "Emergency Notice" | "General Update";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  initial: string;
  avatarBg: string;
  timestamp: string;
  category: Category;
  pinned?: boolean;
  imageEmoji?: string;
  imageBg?: string;
};

const initialPosts: Post[] = [
  {
    id: 1, title: "AGM Notice — Annual General Meeting 2026",
    content: "All members are cordially invited to the Annual General Meeting on 20th July 2026 at 10:00 AM, Community Hall, Ahmedabad. Agenda includes financial review, committee elections, and the 2026–27 development roadmap.",
    author: "Rajesh Patel", role: "President", initial: "R", avatarBg: "from-primary to-accent-saffron",
    timestamp: "2 hours ago", category: "Announcement", pinned: true,
    imageEmoji: "📢", imageBg: "from-primary via-accent-saffron to-warning",
  },
  {
    id: 2, title: "Scholarship Applications Open — Deadline 30 June",
    content: "₹25 lakh scholarship fund for meritorious students of the community. Open to all students entering Class 11, undergraduate, and post-graduate programs. Apply through your local committee head.",
    author: "Sunita Shah", role: "Secretary", initial: "S", avatarBg: "from-success to-primary",
    timestamp: "Yesterday", category: "Scholarship", pinned: true,
  },
  {
    id: 3, title: "Youth Sports Tournament Registration Open",
    content: "Inter-village cricket and kabaddi tournament begins 23rd November at Samaj Ground, Surat. Register your team before 15th November.",
    author: "Kiran Mehta", role: "Committee Member", initial: "K", avatarBg: "from-warning to-accent-saffron",
    timestamp: "2 days ago", category: "Event",
    imageEmoji: "🏏", imageBg: "from-success via-primary to-accent-saffron",
  },
  {
    id: 4, title: "32 Students Felicitated for 10th Board Results",
    content: "A special ceremony was held at the community hall last Sunday to felicitate 32 students who scored above 90% in the 10th board examinations. Congratulations to all the achievers and their families.",
    author: "Anita Desai", role: "Education Head", initial: "A", avatarBg: "from-accent-saffron to-destructive",
    timestamp: "5 days ago", category: "Achievement",
    imageEmoji: "🏆", imageBg: "from-warning to-accent-saffron",
  },
  {
    id: 5, title: "Free Coaching Classes for Class 9 & 10 Students",
    content: "Weekend coaching for Mathematics and Science starting 1st December. Conducted by qualified teachers from the community. Limited seats — register early.",
    author: "Hemant Joshi", role: "Education Committee", initial: "H", avatarBg: "from-primary to-success",
    timestamp: "12 Jun 2026", category: "Education",
  },
  {
    id: 6, title: "Sad Demise of Shri Manilal Patel",
    content: "With deep sorrow we inform the community of the passing of Shri Manilal Patel (age 82) on 8th June. Prayer meeting at family residence, Vadodara, on 11th June at 4:00 PM.",
    author: "Samaj Office", role: "Administrator", initial: "O", avatarBg: "from-muted-foreground to-foreground",
    timestamp: "10 Jun 2026", category: "Obituary",
  },
];

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

const FILTERS = ["All", "Announcement", "Event", "Education", "Scholarship", "Achievement"] as const;

function NewsPage() {
  const navigate = useNavigate();
  const { checking } = useRequireAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showCreate, setShowCreate] = useState(false);

  // Demo: treat current user as authorized
  const isAuthorized = true;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => (filter === "All" ? true : p.category === filter))
      .filter((p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q),
      )
      .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.id - a.id);
  }, [posts, query, filter]);

  const toggleSave = (id: number) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const togglePin = (id: number) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p)));

  const deletePost = (id: number) =>
    setPosts((prev) => prev.filter((p) => p.id !== id));

  const sharePost = async (p: Post) => {
    const text = `${p.title}\n\n${p.content}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try { await (navigator as any).share({ title: p.title, text }); return; } catch {}
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try { await navigator.clipboard.writeText(text); } catch {}
    }
  };

  const addPost = (p: Omit<Post, "id" | "author" | "role" | "initial" | "avatarBg" | "timestamp">) => {
    setPosts((prev) => [
      {
        ...p,
        id: Math.max(0, ...prev.map((x) => x.id)) + 1,
        author: "Ramesh Patel",
        role: "Committee Member",
        initial: "R",
        avatarBg: "from-primary to-accent-saffron",
        timestamp: "Just now",
      },
      ...prev,
    ]);
    setShowCreate(false);
  };

  if (checking) return <LoadingScreen />;

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
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-background" />
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
            {visible.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-16">
                No posts match your search.
              </div>
            )}
            {visible.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                saved={saved.has(p.id)}
                onSave={() => toggleSave(p.id)}
                onShare={() => sharePost(p)}
                onPin={() => togglePin(p.id)}
                onDelete={() => deletePost(p.id)}
                canManage={isAuthorized}
              />
            ))}
            <div className="text-center text-xs text-muted-foreground py-6">You're all caught up ✨</div>
          </div>
        </div>

        {/* Create Post FAB */}
        {isAuthorized && (
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
              { id: "fundraiser", icon: HandHeart, label: "Fundraiser", to: "/home" as const },
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

        {showCreate && <CreatePostSheet onClose={() => setShowCreate(false)} onSubmit={addPost} />}
      </div>
    </PhoneFrame>
  );
}

function PostCard({
  post, saved, onSave, onShare, onPin, onDelete, canManage,
}: {
  post: Post;
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onPin: () => void;
  onDelete: () => void;
  canManage: boolean;
}) {
  const [menu, setMenu] = useState(false);
  const meta = CATEGORY_META[post.category];
  const Icon = meta.icon;

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
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.avatarBg} flex items-center justify-center text-white font-bold shadow-soft shrink-0`}>
          {post.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{post.author}</div>
          <div className="text-[11px] text-muted-foreground truncate">
            {post.role} · {post.timestamp}
          </div>
        </div>
        {canManage && (
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
                <button
                  onClick={() => { onPin(); setMenu(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-muted flex items-center gap-2"
                >
                  <Pin className="w-4 h-4" /> {post.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={() => { onDelete(); setMenu(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-muted text-destructive flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Delete
                </button>
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

      {/* Image */}
      {post.imageEmoji && (
        <div className={`mx-4 mb-3 h-44 rounded-xl bg-gradient-to-br ${post.imageBg ?? "from-primary to-accent-saffron"} flex items-center justify-center`}>
          <span className="text-7xl opacity-90">{post.imageEmoji}</span>
        </div>
      )}

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
  onClose, onSubmit,
}: {
  onClose: () => void;
  onSubmit: (p: Omit<Post, "id" | "author" | "role" | "initial" | "avatarBg" | "timestamp">) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("Announcement");
  const [pinned, setPinned] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const canSubmit = title.trim().length > 2 && content.trim().length > 5;

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

          <button
            onClick={() => setHasImage((v) => !v)}
            className={`w-full h-12 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-semibold transition ${
              hasImage ? "border-primary text-primary bg-primary-soft" : "border-border text-muted-foreground"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            {hasImage ? "Banner attached" : "Upload Image (optional)"}
          </button>

          <label className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted">
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
            onClick={() =>
              onSubmit({
                title: title.trim(),
                content: content.trim(),
                category,
                pinned,
                imageEmoji: hasImage ? "🖼️" : undefined,
                imageBg: hasImage ? CATEGORY_META[category].color : undefined,
              })
            }
            className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
