"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import {
  BLOG_VIEW_COUNTING_DISABLED,
  BLOG_VIEW_COUNTING_PREFERENCE_KEY,
} from "@/lib/privacy-preferences";

/**
 * Live view count for a blog post. GET-only when just displaying a count
 * (e.g. the /blog listing cards); pass `record` on the post's own detail
 * page to bump the counter once per visit.
 *
 * "Once per visit" is enforced client-side via sessionStorage — without it,
 * every re-render/refresh in the same tab would inflate the count, and
 * React 18 Strict Mode's dev-only double-invoke of effects would double it
 * on the very first load.
 */
export default function ViewBadge({
  slug,
  record = false,
  className = "inline-flex items-center gap-1.5",
}: {
  slug: string;
  record?: boolean;
  className?: string;
}) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const sessionKey = `viewed:${slug}`;
    const countingDisabled =
      localStorage.getItem(BLOG_VIEW_COUNTING_PREFERENCE_KEY) === BLOG_VIEW_COUNTING_DISABLED;
    const alreadyRecorded = record && !countingDisabled && sessionStorage.getItem(sessionKey);
    const method = record && !countingDisabled && !alreadyRecorded ? "POST" : "GET";

    fetch(`/api/views/${slug}`, { method })
      .then((res) => res.json())
      .then((data: { label: string }) => {
        if (cancelled) return;
        setLabel(data.label);
        if (method === "POST") sessionStorage.setItem(sessionKey, "1");
      })
      .catch(() => {
        if (!cancelled) setLabel(null);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, record]);

  return (
    <span className={className}>
      <Eye className="h-3.5 w-3.5" />
      {label ?? "···"}
    </span>
  );
}
