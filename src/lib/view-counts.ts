import "server-only";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/** Fetch the current view count for a slug from Firestore */
export async function getViewCount(slug: string): Promise<number> {
  try {
    const db = getAdminDb();
    const doc = await db.collection("viewCounts").doc(slug).get();
    if (!doc.exists) return 0;
    return (doc.data()?.count as number) ?? 0;
  } catch {
    return 0;
  }
}

/** Atomically increment the view count and return the new total */
export async function incrementViewCount(slug: string): Promise<number> {
  try {
    const db = getAdminDb();
    const ref = db.collection("viewCounts").doc(slug);
    await ref.set({ count: FieldValue.increment(1) }, { merge: true });
    const updated = await ref.get();
    return (updated.data()?.count as number) ?? 1;
  } catch {
    return 0;
  }
}

/** "1.8k views" / "1 view" / "42 views" */
export function formatViewCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k views`;
  }
  return `${n} view${n === 1 ? "" : "s"}`;
}

