"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import {
  BLOG_VIEW_COUNTING_DISABLED,
  BLOG_VIEW_COUNTING_PREFERENCE_KEY,
} from "@/lib/privacy-preferences";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

function formatViewCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k views`;
  }
  return `${n} view${n === 1 ? "" : "s"}`;
}

/**
 * Live view count for a blog post.
 * Uses client-side Firebase to fetch and increment view counts.
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
    const shouldRecord = record && !countingDisabled && !alreadyRecorded;

    async function fetchViewCount() {
      try {
        const ref = doc(db, "viewCounts", slug);
        let count = 0;

        if (shouldRecord) {
          await setDoc(ref, { count: increment(1) }, { merge: true });
          sessionStorage.setItem(sessionKey, "1");
          const updated = await getDoc(ref);
          count = updated.exists() ? (updated.data().count as number) : 1;
        } else {
          const docSnap = await getDoc(ref);
          count = docSnap.exists() ? (docSnap.data().count as number) : 0;
        }

        if (!cancelled) {
          setLabel(formatViewCount(count));
        }
      } catch (err) {
        if (!cancelled) setLabel(null);
      }
    }

    fetchViewCount();

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
