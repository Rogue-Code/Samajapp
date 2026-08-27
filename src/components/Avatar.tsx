interface Props {
  /** Uploaded profile photo, when the member has one. */
  url?: string | null;
  /** Falls back to this name's first letter. */
  name?: string | null;
  /** Tailwind size classes, e.g. "w-11 h-11". */
  className?: string;
  /** Text size for the fallback initial. */
  textClassName?: string;
}

/**
 * A member's profile photo, falling back to the first letter of their name.
 *
 * Every list and detail screen used to inline its own initial-letter circle, so
 * uploaded photos only ever appeared on the screen where they were set. Anywhere
 * a member is shown should use this.
 */
export function Avatar({ url, name, className = "w-11 h-11", textClassName = "" }: Props) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <div
      className={`${className} rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-primary to-accent-saffron flex items-center justify-center text-white font-bold ${textClassName}`}
    >
      {url ? <img src={url} alt="" className="w-full h-full object-cover" /> : initial}
    </div>
  );
}
